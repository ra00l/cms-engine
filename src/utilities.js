'use strict';
const crypto = require('crypto');

module.exports = {
  random: function(cnt) {
    return crypto.randomBytes(cnt || 20).toString('hex');
  },
  promiseCatch: function(fn) {
    return function(...args) { fn(...args).catch(args[2]); };
  },
  hashString: function(pwd) {
    const config = require('../index').getOptions();

    let hash = crypto.createHmac('sha512', config.salt);
    hash.update(pwd);
    return hash.digest('hex');
  },
  isProd: function() {
    const envName = process.env.NODE_ENV || 'DEVELOPMENT';
    return envName === 'PRODUCTION';
  }
};
