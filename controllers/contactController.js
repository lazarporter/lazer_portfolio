const Contact = require('../models/Contact')

exports.GETcontacts = (req, res, next) => {
    Contact.fetchAll()
    .then(  ([rows,metaData]) => {
        res.render('contact', {
            contacts: rows,
            hasContacts: rows.length > 0
        })
    })
    .catch( (err) =>{
        console.log(err)
        res.status(500).redirect('/')
    })
}

exports.POSTcontacts = (req, res, next) => {
    //build the query to add the relevent contact to the table
    queryString = "INSERT INTO contactlist VALUES (\"" + req.body.first_name + "\",\"" + req.body.last_name + "\",\"" + req.body.phone + "\");"

    //send the query to add the new person to the DB
    connection.query({
        sql: queryString,
        timeout: 60000
    }, function (error, results, fields) {
        if (error) throw error;

        //If successfull, query the table and get the updated list
        queryString = "SELECT * FROM contactlist;"
        connection.query({
            sql: queryString,
            timeout: 60000
        }, function (error, results, fields) {
            if (error) throw error;

            //save the updated list in memory
            contactList = results.slice()

            res.status(200).redirect('/sql-contact');
        });
    });
}

exports.DELETEcontacts = (req,res,next)=>{
    Contact.deleteByID(req.params.id)
    .then (results => res.sendStatus(204))
    .catch(err => console.log(err))
}