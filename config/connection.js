const Sequelize = require('sequelize');
require('dotenv').config();
// const sequelize = require('../config/connection');

const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,

{
    host:'localhost',
    dialect: 'mysql',
    port:3306
}
);


console.log ("made it to config connection");

module.exports = sequelize;