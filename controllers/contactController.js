var mysql = require('mysql')
var contactList = [] //will hold the contacts that come back from each SQL Query

exports.initializeContacts = () => {
    //outsource the connection info to allow for keeping those details private (if config.js was .gitignored)
    var connectParams = require('../config').connectionInfo
    var connection = mysql.createConnection(connectParams);
    //connect to the database
    connection.connect();
    //create the query string, table name is contactlist
    var queryString = "SELECT * FROM contactlist;"
    //Query the db to see get whatever is currently in there
    connection.query({
        sql: queryString,
        timeout: 60000
    }, function (error, results, fields) {
        if (error) throw error;
        contactList = results.slice()
    });
}

exports.GETcontacts = (req, res, next) => {
    // console.log("controller.getContacts")
    // res.redirect('/')
    res.render('contact', {
        contacts: contactList,
        hasContacts: contactList.length > 0
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