const Sequelize = require('sequelize');
const db = require('../index');
const User = require('./user');

const Page = db.define('page', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    alowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  layout: {
    type: Sequelize.STRING
  },
  publishDate: {
    type: Sequelize.DATE
  },
  pageType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdBy: Sequelize.BIGINT,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, { timestamps: true });


Page.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'});

module.exports = Page;
