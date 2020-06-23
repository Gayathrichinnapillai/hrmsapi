const Sequelize = require('sequelize');
const sequelize = new Sequelize('Infologiadb','valuesdp','Infologia_1', {
  host:'15.206.186.249',
  dialect:'mysql',
  operatorsAliases:1,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Customer = require('./Models/Register.js')(sequelize, Sequelize);
module.exports = db;