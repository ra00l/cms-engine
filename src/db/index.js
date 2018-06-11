const Sequelize = require('sequelize');
const config = require('../../index').getOptions();
const logger = require('../logger');

require('pg').defaults.parseInt8 = true; //return BIGINT as integer, not string
logger.info('options: ', config);

const sequelize = new Sequelize(config.connectionString,
  {
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    },
    logging: console.log,
    operatorsAliases: false,
    dialect: 'postgresql',
    define: {
      freezeTableName: true //prevent sequelize from pluralizing table names
    }
  }
);

module.exports = sequelize;
