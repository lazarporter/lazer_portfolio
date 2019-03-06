const express = require('express')
const router = express.Router();
const controllers = require('../controllers/PDFbootstrap')

router.get('/pdftobootstrap', controllers.getPDFBootstrap);

module.exports = router;