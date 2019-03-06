const db = require('../util/database')
const Contact = require('../models/Contact')

var contactList = [] //will hold the contacts that come back from each SQL Query



exports.initializeContacts = () => {
    Contact.fetchAll()
    .then(([rows,metaData]) => {
        console.log(rows[0].first_name)
    })
    .catch(err => console.log(err))
    
    // connection.query({
    //     sql: queryString,
    //     timeout: 60000
    // }, function (error, results, fields) {
    //     if (error) throw error;
    //     contactList = results.slice()
    // });
}

exports.GETcontacts = (req, res, next) => {
    Contact.fetchAll()
    .then(([rows,metaData]) => {
        console.log(rows[0].first_name)
        res.render('contact', {
            contacts: rows,
            hasContacts: rows.length > 0
        })

    })
    .catch(err => console.log(err))
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
    //build the query to delete the relevent contact from the table
    queryString = "DELETE FROM contactlist WHERE phone = \"" + req.params.id + "\";"    
    connection.connect();
    //send the query
    connection.query({sql: queryString, timeout:60000}, function (error, results, fields) {
        if (error) throw error;
        
        //if succesfully deleted, send back and empty success response so the AJAX call can finish and remove() the row.
        res.status(204).end()

        //build a new query to get the updated list
        queryString = "SELECT * FROM contactlist;"        
        connection.query({sql: queryString, timeout:60000}, function (error, results, fields) {
            if (error) throw error            
            
            //save the updated list in memory
            contactList = results.slice()
        });        
    });    
}