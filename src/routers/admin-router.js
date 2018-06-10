'use strict';

const express = require('express');
const router = express.Router();
//const opts = require('../../index').getOptions();
const cmsHelper = require('../cms-helper');

function isAdminAuthd(req) {
  return !!req.adminSession.iduser;
}

router.all('*', function(req, res, next) {
  const url = req.originalUrl;

  if(cmsHelper.isAdminPage(url)) {
    if(!isAdminAuthd(req)) {
      return res.redirect('/admin/login');
    }
  }

  return next();
});

/* GET users listing. */
router.get('/', function (req, res) {
  UserModel.byID(req.adminSession.iduser, function (err, user) {
    res.render('admin/index', {
      user: user
    });
  });
});

router.get('/pages', function (req, res) {
  var page = req.query.page || 1;
  CMSModel.adminList(page, {category: req.category}, function (err, pageList, total) {
    if (!pageList) pageList = [];

    res.renderWithGlobals('admin/pages', {
      pageList: pageList,
      page: page,
      total: total
    });
  });
});

router.get('/settings', function (req, res) {
  var page = req.query.page || 1;
  CMSModel.settingsList(page, function (err, settList) {
    if (!settList) settList = [];

    res.render('admin/settings', {
      settList: settList,
      DATE_FORMAT: 'YYYY-MM-DD'
    });
  });
});

router.get('/page/:idPage?', function (req, res) {
  var idPage = req.params.idPage; //todo raul: get categs!

  CMSModel.getPage(idPage, function (err, pageList) {
    var page = pageList && pageList.length && pageList[0];

    var catList = [];
    catList.splice(0, 0, {text: ' -- None --', value: ''});

    res.render('admin/page', {
      page: page,
      catList: catList
    });
  });
});

router.post('/page/:idPage?', function (req, res) {
  var errList = [];
  //errList.push('Url NOT unique!!');

  if (errList.length > 0) {
    var catList = [];
    catList.splice(0, 0, {text: ' -- None --', value: ''});

    return res.render('admin/page', {
      page: req.body,
      catList: catList,
      errList: errList
    });
  }

  //save to db + redirect to ID page
  var idPage = req.params.idPage;
  CMSModel.savePage(idPage, {
    title: req.body.title,
    url: req.body.url,
    publish_date: req.body.publishDate,
    category: req.body.category || null,
    content: req.body.content,
    description: req.body.description,
    exerpt: req.body.exerpt
  }, function (id) {
    if (!id) id = idPage;
    return res.redirect('/admin/page/' + id);
  });
});

router.get('/login', function (req, res) {
  res.render('admin/login', {});
});
router.post('/login', function (req, res, next) {
  var loginData = {user: req.body.user, pass: req.body.pass};

  UserModel.login(loginData, function (err, user) {
    if (err) return next();

    if (!user) {
      return res.render('admin/login', {msg: 'Username / password incorrect!', user: req.body.user});
    }


    //write cookie, redirect to home!
    req.adminSession.iduser = user.id;
    return res.redirect('/admin');

  });
});


module.exports = router;
