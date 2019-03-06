const mysql = require('mysql2')
const poolInfo = require('./config').poolInfo

const pool = mysql.createPool(poolInfo)

module.exports = pool.promise()