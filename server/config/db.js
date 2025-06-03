const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'your_mysql_password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
