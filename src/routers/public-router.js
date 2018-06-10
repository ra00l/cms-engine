const opts = require('../../index').getOptions();
const PageActions = require('../actions/pageActions');
const utilities = require('../utilities');
const cmsHelper = require('../cms-helper');

module.exports = utilities.promiseCatch(async function (req, res, next) {

  const url = req.originalUrl;

  if (cmsHelper.isAdminPage(url)) { //start with admin
    return next();
  }

  let pageUrl = url.split('/');

  let page = await PageActions.getPageByUrl(pageUrl);
  if (!page) return next();

  let pageToRender = opts.pages.sitePage; //'site/page';

  return res.render(pageToRender, {
    title: page.title,
    description: page.description,
    content: page.content
  });
});
