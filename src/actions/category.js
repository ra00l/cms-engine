const db = require('../db/models');

module.exports = {
  byUrl: async function(url) {
    return db.category.findOne({where:{url:url}});
  }
};
