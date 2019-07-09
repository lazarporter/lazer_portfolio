const db = require('../util/database').pool;
const table = require('../util/database').table;

const Sequelize = require('Sequelize');
const sequelize = require('../util/database');

const Contact = sequelize.define('contact', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(10)
    }
});

module.exports = Contact;