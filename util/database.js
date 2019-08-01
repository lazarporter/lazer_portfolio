//create an instance for DB operations
const Sequelize = require('sequelize');
let 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {dialect: 'mysql', host: process.env.DB_HOST});
//const sequelize = new Sequelize('sql9273064', 'sql9273064', 'TzDasygDeh', {dialect: 'mysql', host: 'sql9.freemysqlhosting.net'});

module.exports = sequelize;