'use strict';

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const sessions = require('client-sessions');
const bodyParser = require('body-parser');

const logger = require('./src/logger');

const defaultOptions = {
  pages: {
    adminMasterPage: '',
    sitePage: ''
  },
  ipp: 10,
  connectionString: '',
  salt: '1234',
  sessionSalt: '4567',
  adminPath: '/admin',
  dateFormat: 'yyyy-MM-dd'
};
let appOptions = null;

let hasInit = false;
function init(expressApp, options) {
  if(hasInit) console.warn('Caling init twice. Are you sure?');
  require('./src/logger').info(options);
  appOptions = Object.assign({}, defaultOptions, options);

  expressApp.use(helmet());

  expressApp.use(cookieParser());
  expressApp.use(sessions({
    cookieName: 'adminSession', // cookie name dictates the key name added to the request object
    secret: appOptions.sessionSalt, // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: true
    }
  }));

  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({extended: false}));

  expressApp.use(compression({ threshold: 7 }));

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
  logger: logger,
  utilities: require('./src/utilities')
};
