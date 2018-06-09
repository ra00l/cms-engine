const opts = require('../../index').getOptions();
const PageActions = require('../actions/pageActions');

module.exports = utilities.promiseCatch(async function (req, res, next) {

  const url = req.originalUrl;

  if (url.indexOf(opts.adminPath) === 0) { //start with admin
    return next();
  }

  let pageUrl = url.split('/');

  let page = await PageActions.getPage(pageUrl);
  if(!page) return next();

  //do we have categories? we should match those as well!!!


  cms_page.byURL(url, function (err, data, cat) {
    if (err) {
      logger.error('Error getting url ' + url);
      return next();
    }
    if (!data && !cat) {
      return next();
    }

    if (data) { //page found
      if (!cat && data.cat_url !== '/') return next();
      else if (cat && data.cat_url !== cat.url) { //checking if category matches ?
        return next();
      }
    }

    var pageToRender = 'site/page';

    if (data) {
      if (cat && cat.default_layout) pageToRender = 'site/' + cat.default_layout;
      if (data.layout) pageToRender = 'site/' + data.layout;

      res.renderWithGlobals(pageToRender, {
        title: data.title,
        description: data.description,
        content: data.content
      });
    }
    else if (cat) {
      if (cat.default_layout) pageToRender = 'site/' + cat.default_layout;

      if (cat.id_default_page) { //todo: render page default category!

      }
      else if (cat.can_list_contents) {
        //get a list of children + render
        pageToRender = 'site/category_list';

        var currPage = +req.query.page || 1;

        cms_page.getPageList(currPage, function (err2, data2, cnt2) {

          res.renderWithGlobals(pageToRender, {
            title: cat.name,
            description: cat.description,
            pageList: data2,
            page: currPage,
            total: Math.round(cnt2 / global.appConfig.IPP) + (cnt2 % global.appConfig.IPP > 0 ? 1 : 0)
          });
        });
      }
      else next();
    }
  })
);
