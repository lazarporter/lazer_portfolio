const express = require('express')
const router = express.Router();
const contactController = require('../controllers/contactController')

//GET @ /sql-contact
router.get('/', contactController.GETcontacts)

//POST @ /sql-contact |  route for adding a contact to the SQL database
router.post('/', contactController.POSTcontacts)

//DELETE @ /sql-contact | route for deleteing a contact from the database.
router.delete('/:id/', contactController.DELETEcontacts)

module.exports = router;