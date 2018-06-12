const db = require('../db/models');

module.exports = {
  getPageByUrl: async function(urlParts) {
    let idCat = null;
    if(urlParts.length > 1) {
      const cat = await db.category.findOne({where: {url: urlParts[urlParts.length - 2]}});
      if(!cat) return null;

      idCat = cat.id;
    }

    const page = await db.page.findOne({where: {url: urlParts[urlParts.length - 1], idCategory: idCat}});

    return page;
  }

};
