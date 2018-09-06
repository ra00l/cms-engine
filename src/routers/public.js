const opts = require('../../index').getOptions();
const PageActions = require('../actions/page');
const CategoryActions = require('../actions/category');
const utilities = require('../utilities');
const cmsHelper = require('../cms-helper');

const Sequelize = require('sequelize');
const db = require('../db/models');

module.exports = utilities.promiseCatch(async function (req, res, next) {

  let url = req.path;
  if(url.indexOf('/') === 0) url = url.substr(1);

  let pageUrl = url.split('/');

  let page = await PageActions.getPageByUrl(pageUrl);
  if (!page) {
    //might be a category!
    if(!page && pageUrl.length === 1) {
      let category = await CategoryActions.byUrl(pageUrl[0]);
      if(!category) return next();

      if(category.canListContents) {
        const totalPosts = (await db.raw.query('select count(*) "count" from page where "publishDate" is not null',  { type: Sequelize.QueryTypes.SELECT}))[0].count;
        const totalPageNo = Math.round(totalPosts / opts.ipp) + (totalPosts % opts.ipp === 0 ? 0 : 1);

        let pageNo = Math.min(totalPageNo, Math.max(1, +req.query.page || 1));

        const posts = await db.raw.query(`select p.title, p.url, p."publishDate", p.exerpt, u.name "author" from page p left join "user" u on u.id=p."createdBy" where p."publishDate" is not null offset ${(pageNo - 1) * opts.ipp} limit ${opts.ipp}`,  { type: Sequelize.QueryTypes.SELECT});

        console.log('total: ', totalPosts);

        return res.render(opts.pages.categoryList, Object.assign({
          title: category.name,
          description: category.description,
          pageList: posts,
          page: pageNo,
          total: totalPageNo
        }, opts.pageDefaults));
      }
    }
    return next();
  }

  let pageToRender = opts.pages.sitePage; //'site/page';

  return res.render(pageToRender, Object.assign({
    title: page.title,
    description: page.description,
    content: page.content
  }, opts.pageDefaults));
});
