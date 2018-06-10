const opts = require('../index').getOptions();

module.exports = {
  isAdminLogin: function(url) {
    return url.indexOf(opts.adminPath + '/login') === 0;
  },
  isAdminPage: function(url) {
    return url.indexOf(opts.adminPath) === 0 && !this.isAdminLogin(url);
  }
};
