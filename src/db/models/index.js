'use strict';
const sequelize = require('../index');

module.exports = {
  raw: sequelize,

  user: require('./user'),
  category: require('./category'),
  page: require('./page'),
  pageHistory: require('./page-history'),

  syncAll: async function () {

    let opts;
    //if(true) opts = { force: true }; //delete & recreate tables!

    await this.user.sync(opts);
    await this.category.sync(opts);
    await this.page.sync(opts);
    await this.pageHistory.sync(opts);
  }
};
