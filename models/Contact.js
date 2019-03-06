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
        if(!this.id){
            return db.execute('INSERT INTO contactlist1 (first_name, last_name, phone) VALUES (\"' + this.first_name + '\",\"' + this.last_name + '\",\"' + this.phone + '\")')            
        }

        else{
            //code for updating existing contacts
        }
    }

    static deleteByID(id){
        return db.execute('DELETE FROM contactlist1 WHERE id='+id)
    }

    static fetchAll (){
        return db.execute('SELECT * FROM contactlist1')
    }
}