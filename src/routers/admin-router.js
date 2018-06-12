'use strict';

const express = require('express');
const router = express.Router();
const opts = require('../../index').getOptions();
const cmsHelper = require('../cms-helper');
const AccountActions = require('../actions/account');
const AdminActions = require('../actions/admin');
const logger = require('../logger');

function isAdminAuthd(req) {
  return !!req.adminSession.iduser;
}

router.all('*', async function(req, res, next) {
  const url = req.originalUrl;

  if(!cmsHelper.isAdminPage(url)) return next();

  if(!isAdminAuthd(req)) {

  }
  else {
    if(!req.locals) req.locals = {};
    req.locals.user = await AccountActions.getUser(req.adminSession.iduser);

    if(!req.locals.user) return res.redirect('/admin/login');
  }

  return next();
});

/* GET users listing. */
router.get('/', function (req, res) {
    return res.render('admin/index', {
      user: req.locals.user
    });
});

router.get('/pages', async function (req, res) {
  const pageNo = Math.max(+req.query.page || 1, 1);

  const outObj = await AdminActions.getPageList(pageNo, req.category);

    res.render('admin/pages', Object.assign({
      pageList: outObj.posts,
      page: pageNo,
      total: outObj.total
  }, opts.pageDefaults));
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

router.post('/login', async function (req, res, next) {
  const user = await AccountActions.login(req.body.user, req.body.pass);

  if(!user) {
    logger.warn('failed auth for email ', req.body.user);
    return res.render('admin/login', {msg: 'Username / password incorrect!', user: req.body.user});
  }

  req.adminSession.iduser = user.id;

  return res.redirect('/admin');
});


module.exports = router;
