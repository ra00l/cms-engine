const Sequelize = require('sequelize');
const db = require('../index');
const User = require('./user');

const PageHistory = db.define('pageHistory', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  idPage: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  pageType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT
  },
  createdBy: Sequelize.BIGINT,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, { timestamps: true });


Page.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'});

module.exports = Page;
