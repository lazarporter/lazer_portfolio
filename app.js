const express = require('express')
const bodyParser = require('body-parser');

const path = require("path")
var mysql = require('mysql');
//const ejs = require('ejs')

//grab the SQL table as soon as a user visits the site
var connectParams = require(path.join(__dirname, 'config.js')).connectionInfo
var connection = mysql.createConnection(connectParams);

//will hold the contacts that come back from each SQL Query
var contactList = []

//Query the db for existing contacts
connection.connect();
var queryString = "SELECT * FROM contactlist;"
//table name is contactlist
connection.query(queryString, function (error, results, fields) {
    if (error) throw error;
    contactList = results.slice()

    // contactList.forEach((contact) => {
    //     console.log(`Hi, my name is ${contact.first_name}`)
    // })
});



let app = express()
var port = 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs') //templating engine
app.set('views', __dirname) //where are the templates?


// Defind the routes:

//home route
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

//route for weather app
app.get('/weather', (req, res, next) => {
    res.sendFile(path.join(__dirname, "weather.html"))
})

//route for wikipedia search app
app.get('/wikipedia_viewer', (req, res, next) => {
    res.sendFile(path.join(__dirname, "wikipedia_viewer.html"))
})

//GET route for the SQL based contact list
app.get('/sql-contact', (req, res, next) => {
    res.render('contact', {
        contacts: contactList,
        hasContacts: contactList.length > 0
    })
    //res.write('<html><body><h1>This page is under construction.</h1></body></html>')    
})

//POST route for adding data to the SQL databast
app.post('/sql-contact', (req, res, next) => {
    queryString = "INSERT INTO contactlist VALUES (\"" + req.body.first_name + "\",\"" + req.body.last_name + "\",\"" + req.body.phone + "\");"
    console.log(queryString)

    //add the new person to the DB
    connection.query(queryString, function (error, results, fields) {
        if (error) throw error;

        //If successfull, query the table and get the updated list
        queryString = "SELECT * FROM contactlist;"
        connection.query(queryString, function (error, results, fields) {
            if (error) throw error;
            
            //save the updated list in memory
            contactList = results.slice()

            // contactList.forEach((contact) => {
            //     console.log(`Hi, my name is ${contact.first_name}`)
            // })
            res.redirect('/sql-contact');
        });

        
    });

    
})



app.use(express.static(__dirname + '/'));
app.listen(port, function () {
    console.log("Running contact app on port " + port)

})
