//create an instance for DB operations
const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql9273064', 'sql9273064', 'TzDasygDeh', {dialect: 'mysql', host: 'sql9.freemysqlhosting.net'});

module.exports = sequelize;