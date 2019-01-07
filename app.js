const express = require('express')
const path = require("path")
const ejs = require('ejs')
var mysql = require('mysql');




let app = express()
var port = 8080
app.set('view engine', 'ejs') //templating engine

app.get('/weather', (req, res, next) => {
    res.sendFile(path.join(__dirname, "weather.html"))
})

app.get('/wikipedia_viewer', (req, res, next) => {
    res.sendFile(path.join(__dirname, "wikipedia_viewer.html"))
})

// app.get('/contact-list', (req, res, next) => {
//     res.send([{
//         "personName": "Mike",
//         "number": "555-555-5555"
//     }, {
//         "personName": "Lazer",
//         "number": "555-555-5555"
//     }]);
//     console.log("get at /contact-last")
// })

app.get('/sql-contact', (req, res, next) => {
    res.send('<html><body><h1>This page is under construction.</h1></body></html>')
    //res.sendFile(path.join(__dirname, "contact.html"))
})

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use(express.static(__dirname + '/'));
app.listen(port, function () {
    console.log("Running contact app on port " + port)
})
