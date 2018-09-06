const Sequelize = require('sequelize');
const db = require('../index');

const User = require('./user');

const Setting = db.define('category', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy: Sequelize.BIGINT,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, { timestamps: true });

module.exports = Setting;
