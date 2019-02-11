const express = require('express')
var favicon = require('serve-favicon')
const bodyParser = require('body-parser');
var morgan  = require('morgan')
const path = require("path")
var mysql = require('mysql')

var contactList = [] //will hold the contacts that come back from each SQL Query

//outsource the connection info to allow for keeping those details private (if config.js was .gitignored)
var connectParams = require(path.join(__dirname, 'config.js')).connectionInfo
var connection = mysql.createConnection(connectParams);
//connect to the database
connection.connect();


//create the query string, table name is contactlist
var queryString = "SELECT * FROM contactlist;"

//Query the db to see get whatever is currently in there
connection.query({sql: queryString, timeout:60000}, function (error, results, fields) {
    if (error) throw error;
    contactList = results.slice()
});

let app = express()
var port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev'))
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
app.get('/pdftobootstrap', (req,res,next) =>{
    res.render('PDFtoBootstrap')
})

//GET route for the SQL based contact list
app.get('/sql-contact', (req, res, next) => {
    //compile the HTML page with the up to date contact list in memory, send compiled page
    res.render('contact', {
        contacts: contactList,
        hasContacts: contactList.length > 0        
    })
})

//POST route for adding data to the SQL databast
app.post('/sql-contact', (req, res, next) => {
    //build the query to add the relevent contact to the table
    queryString = "INSERT INTO contactlist VALUES (\"" + req.body.first_name + "\",\"" + req.body.last_name + "\",\"" + req.body.phone + "\");"
    
    //send the query to add the new person to the DB
    connection.query({sql: queryString, timeout:60000}, function (error, results, fields) {
        if (error) throw error;

        //If successfull, query the table and get the updated list
        queryString = "SELECT * FROM contactlist;"
        connection.query({sql: queryString, timeout:60000}, function (error, results, fields) {
            if (error) throw error;
            
            //save the updated list in memory
            contactList = results.slice()
            
            res.status(200).redirect('/sql-contact');
        });
        
    });    
})  


app.delete('/sql-contact/:id/', (req,res,next)=>{
    //build the query to delete the relevent contact from the table
    queryString = "DELETE FROM contactlist WHERE phone = \"" + req.params.id + "\";"    
    
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
})

app.use(express.static(__dirname + '/'));
app.listen(port, function () {
    console.log("Running contact app on port " + port)
})
