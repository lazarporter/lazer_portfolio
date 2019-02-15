const express = require('express')
var favicon = require('serve-favicon')
const bodyParser = require('body-parser');
var morgan  = require('morgan')
const path = require("path")

const routes = require('./routes/index')
require('./controllers/contactController').initializeContacts()

let app = express()
var port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev'))
app.set('view engine', 'ejs') //templating engine
app.set('views', 'views') //where are the templates?

//home route
app.get('/', (req, res, next) => {
    res.render('home')
})

//route for weather app
app.get('/weather', (req, res, next) => {
    res.render('weather')
})

//route for wikipedia search app
app.use('/wikipedia_viewer', routes.wikiRoutes)
// (req, res, next) => {
//     res.render('wikipedia_viewer')
// })
app.get('/pdftobootstrap', (req,res,next) =>{
    res.render('PDFtoBootstrap')
})

//GET route for the SQL based contact list
app.use('/sql-contact', routes.contactRoutes)





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
