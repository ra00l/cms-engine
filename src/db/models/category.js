const Sequelize = require('sequelize');
const db = require('../index');

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
  defaultPage: {
    type: Sequelize.BIGINT
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdBy: Sequelize.BIGINT,

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, { timestamps: true });


Category.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'});

module.exports = Category;
