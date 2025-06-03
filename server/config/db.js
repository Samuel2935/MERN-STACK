const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'root', 'Coldpath@2935', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
