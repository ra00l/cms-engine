const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  pass: {
    type: Sequelize.STRING
  },
  isActive: Sequelize.BOOLEAN,
  userType: Sequelize.INTEGER,
  confirmKey: {
    type: Sequelize.STRING
  },
  lastLoginDate: Sequelize.DATE,

  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {timestamps: true});


module.exports = User;
