const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const morgan  = require('morgan')
const path = require("path")
const sequelize = require('./util/database');
let testDB = process.env.DB_URI || 'failed'


const routes = require('./routes/index')
// require('./controllers/contactController').initializeContacts()

let app = express()
let port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(morgan('dev'))
app.set('view engine', 'ejs') //templating engine
app.set('views', 'views') //where are the templates?

//establish routes
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

sequelize.sync().then(result =>{
    app.listen(port, function () {
        console.log("Running contact app on port " + port)
    })
})
.catch(err =>{
    console.log("Error syncing SQL: " + err);
});

