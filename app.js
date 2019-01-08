const express = require('express')
const path = require("path")
var mysql = require('mysql');
//const ejs = require('ejs')

//grab the SQL table as soon as a user visits the site
var connectParams = require(path.join(__dirname, 'config.js')).connectionInfo
var connection = mysql.createConnection(connectParams);


var contactList = []


connection.connect();
//table name is contactlist
connection.query("SELECT * FROM contactlist;", function (error, results, fields) {
    if (error) throw error;
    contactList = results.slice()
    
    contactList.forEach((contact) => {
        console.log(`Hi, my name is ${contact.first_name}`)
    })
});


let app = express()
var port = 8080
//app.set('view engine', 'ejs') //templating engine

app.get('/weather', (req, res, next) => {
    res.sendFile(path.join(__dirname, "weather.html"))
})

app.get('/wikipedia_viewer', (req, res, next) => {
    res.sendFile(path.join(__dirname, "wikipedia_viewer.html"))
})

app.get('/sql-contact', (req, res, next) => {
    
    res.write('<html><body><h1>This page is under construction.</h1></body></html>')
    
    //res.sendFile(path.join(__dirname, "contact.html"))
})

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use(express.static(__dirname + '/'));
app.listen(port, function () {
    console.log("Running contact app on port " + port)

})
