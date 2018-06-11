const Sequelize = require('sequelize');
const db = require('../index');

const User = require('./user');

const Category = db.define('category', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  idDefaultPage: {
    type: Sequelize.BIGINT
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  canListContents: {
    type: Sequelize.BOOLEAN
  },
  defaultLayout: {
    type: Sequelize.STRING
  },
  createdBy: Sequelize.BIGINT,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, { timestamps: true });


Category.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'});

module.exports = Category;
