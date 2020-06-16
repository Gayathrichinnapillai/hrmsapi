const Sequelize = require('sequelize');
const sequelize = new Sequelize('Infologiadb','sa','Infologia_1', {
  host:'localhost',
  dialect:'mysql',
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Customer = require('./Models/Register.js')(sequelize, Sequelize);
module.exports = db;