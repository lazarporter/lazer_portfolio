const db = require('../util/database')
const table = 'contactlist1'

module.exports = class Contact {
    constructor(id, first_name, last_name, phone) {
        this.id = id
        this. first_name = first_name
        this.last_name = last_name
        this.phone = phone
    }

    save () {

    }

    static deleteByID(id){

    }

    static fetchAll (){
        return db.execute('SELECT * FROM contactlist1')
    }

    static findByID(id){

    }
}