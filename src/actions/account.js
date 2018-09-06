const db = require('../db/models');
const utilities = require('../utilities');

module.exports = {
  login: async function(user, pass) {
    if(!user || !pass) return null;

    const hashedPass = utilities.hashString(pass);
    console.log('pass', pass, 'hash', hashedPass);

    return db.user.findOne({where: {email: user, pass: hashedPass}});
  },
  getUser: async function(idUser) {
    return db.user.findOne({where: {id: idUser}});
  },
  logout: function(){

  },
  updateAccount: function() {

  },
  createAccount: function(){

  },
  disableAccount: function() {

  }
};
