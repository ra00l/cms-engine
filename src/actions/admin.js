const db = require('../db/models');
const opts = require('../../index').getOptions();
const Sequelize = require('sequelize');

module.exports = {
  getPageList: async function(pageNo, idCategory) {
    const posts = await db.raw.query(`select p.id, p.title, p.name, p.url, p."publishDate", p.exerpt, u.name "author" from page p left join "user" u on u.id=p."createdBy" where p."publishDate" is not null offset ${(
      pageNo - 1) * opts.ipp} limit ${opts.ipp}`,  { type: Sequelize.QueryTypes.SELECT});

    const totalPosts = (await db.raw.query('select count(*) "count" from page where "publishDate" is not null',  { type: Sequelize.QueryTypes.SELECT}))[0].count;
    const totalPageNo = Math.round(totalPosts / opts.ipp) + (totalPosts % opts.ipp === 0 ? 0 : 1);

    return { posts: posts, total: totalPageNo };
  },
  getPage: async function(idPage) {
    return db.page.findById(idPage);
  },
  savePage: async function(idPage, pageProps) {
    const page = await db.page.findById(idPage);

    page.title = pageProps.title;
    page.url = pageProps.url; //todo change url only on create? have some checks around it?
    page.publishDate = pageProps.publishDate;
    page.idCategory = pageProps.idCategory;
    page.content = pageProps.content;
    page.description = pageProps.description;
    page.exerpt = pageProps.exerpt;

    page.save();

    return page;
  }
};
