// const mysql = require('mysql2');
// const poolInfo = require('./config').poolInfo;
// pool = mysql.createPool(poolInfo)

// module.exports = {
//     pool: mysql.createPool(poolInfo),
//     table: "contactlist1"
// };

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql9273064', 'sql9273064', 'TzDasygDeh', {dialect: 'mysql', host: 'sql9.freemysqlhosting.net'});

module.exports = sequelize;