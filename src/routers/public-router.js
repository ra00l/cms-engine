const opts = require('../../index').getOptions();
const PageActions = require('../actions/page');
const utilities = require('../utilities');
const cmsHelper = require('../cms-helper');

module.exports = utilities.promiseCatch(async function (req, res, next) {

  let url = req.originalUrl;
  if(url.indexOf('/') === 0) url = url.substr(1);

  console.log('entered public', url);

  let pageUrl = url.split('/');

  let page = await PageActions.getPageByUrl(pageUrl);
  if (!page) return next();

  let pageToRender = opts.pages.sitePage; //'site/page';

  return res.render(pageToRender, Object.assign({
    title: page.title,
    description: page.description,
    content: page.content
  }, opts.pageDefaults));
});
