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

// module.exports = class Contact {
//     constructor(id, first_name, last_name, phone) {
//         this.id = id
//         this. first_name = first_name
//         this.last_name = last_name
//         this.phone = phone
//     }

//     save () {
//         if(!this.id){
//             return db.execute('INSERT INTO ? (first_name, last_name, phone) VALUES (?, ?, ?)',
//                 [table, this.first_name, this.last_name,  this.phone]
//             )            
//         }

//         else{
//             //code for updating existing contacts
//         }
//     }

//     static deleteByID(id){
//         return db.execute('DELETE FROM ? WHERE id= ?',
//             [table, id]);
//     }

//     static fetchAll (){
//         return db.execute('SELECT * FROM ?', [table]);
//     }
// }