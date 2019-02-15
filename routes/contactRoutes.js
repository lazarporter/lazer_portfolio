const express = require('express')
const router = express.Router();
const contactController = require('../controllers/contactController')

router.get('/', contactController.GETcontacts)

//POST route for adding data to the SQL databast
router.post('/', contactController.POSTcontacts)

module.exports = router;