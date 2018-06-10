'use strict';
const crypto = require('crypto');
const config = require('../index').getOptions();

module.exports = {
  random: function(cnt) {
    return crypto.randomBytes(cnt || 20).toString('hex');
  },
  promiseCatch: function(fn) {
    return function(...args) { fn(...args).catch(args[2]); };
  },
  hash: function(pwd) {
    let hash = crypto.createHmac('sha512', config.salt);
    hash.update(pwd);
    return hash.digest('hex');
  },
  debug: function() {

  }
};
