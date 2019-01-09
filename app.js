const express = require('express')
const bodyParser = require('body-parser');
const path = require("path")
var mysql = require('mysql');


//grab the SQL table as soon as a user visits the site

//will hold the contacts that come back from each SQL Query
var contactList = []

//outsource the connection info to allow for keeping those details private (if config.js was .gitignored)
var connectParams = require(path.join(__dirname, 'config.js')).connectionInfo
var connection = mysql.createConnection(connectParams);
connection.connect();


//create the query string, table name is contactlist
var queryString = "SELECT * FROM contactlist;"

//Query the db to see get whatever is currently in there
connection.query(queryString, function (error, results, fields) {
    if (error) throw error;
    contactList = results.slice()
});


let app = express()
var port = 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs') //templating engine
app.set('views', 'views') //where are the templates?


//Routes:

//home route
app.get('/', (req, res, next) => {
    res.render('home')
})

//route for weather app
app.get('/weather', (req, res, next) => {
    res.render('weather')
})

//route for wikipedia search app
app.get('/wikipedia_viewer', (req, res, next) => {
    res.render('wikipedia_viewer')
})

//GET route for the SQL based contact list
app.get('/sql-contact', (req, res, next) => {
    res.render('contact', {
        contacts: contactList,
        hasContacts: contactList.length > 0        
    })
    //res.send('<html><body><h1>This page is under construction.</h1></body></html>')    
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
            res.status(200).redirect('/sql-contact');
        });

        
    });

    
})



app.use(express.static(__dirname + '/'));
app.listen(port, function () {
    console.log("Running contact app on port " + port)

})
