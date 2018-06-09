'use strict';

const defaultOptions = {
  pages: {
    adminMasterPage: '',
    sitePage: ''
  },
  connectionString: '',
  salt: '1234',
  adminPath: '/admin'
};
let appOptions = null;

let hasInit = false;
function init(expressApp, options) {
  if(hasInit) console.warn('Caling init twice. Are you sure?');

  appOptions = Object.assign({}, defaultOptions, options);

  expressApp.use(appOptions.adminPath, require('./src/routers/admin-router'));
  expressApp.use(require('./src/routers/public-router'));

  hasInit = true;
}

module.exports = {
  init: init,
  getOptions: function() {
    if(!init) console.warn('Attempting to getOptions before calling init!');

    return appOptions;
  },
  utilities: require('./src/utilities')
};
