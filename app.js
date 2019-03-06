const express = require('express')
var favicon = require('serve-favicon')
const bodyParser = require('body-parser');
var morgan  = require('morgan')
const path = require("path")

const routes = require('./routes/index')
// require('./controllers/contactController').initializeContacts()

let app = express()
var port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev'))
app.set('view engine', 'ejs') //templating engine
app.set('views', 'views') //where are the templates?

app.get('/', (req, res, next) => {
    res.render('home')
})

app.get('/weather', (req, res, next) => {
    res.render('weather')
})
app.use('/wikipedia_viewer', routes.wikiRoutes)
app.get('/pdftobootstrap', routes.pdftobootstrap)
app.use('/sql-contact', routes.contactRoutes)
app.use(express.static(__dirname + '/'));

app.listen(port, function () {
    console.log("Running contact app on port " + port)
})