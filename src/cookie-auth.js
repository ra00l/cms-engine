'use strict';
var logger = requireRoot('./helpers/logger');
//var cms_page = require('../cms/models/CMSModel');

module.exports = function (paths) {
  logger.info('cms auth middleware inited', paths);

  function isAdminAuthd(req) {
    if (req.adminSession.iduser) {
      return true;
    }

    return false;
  }

  return function (req, res, next) {

    var url = req.originalUrl;

    //var pageToRender = '';
    if (url === '/admin/login') { //allow login access as public
    }
    else if (url.indexOf('/admin') === 0) { //start with admin
      if (!isAdminAuthd(req)) {
        return res.redirect('/admin/login');
      }
    }

    return next();


    //res.render('/mi')
    //res.render(pageToRender, { title: data.title, description: data.description, content: data.content, layout: data.layout });
  };
};
