const Contact = require('../models/Contact')

exports.GETcontacts = (req, res, next) => {
    Contact.fetchAll()
    .then(  ([rows,metaData]) => {
        res.render('contact', {
            contacts: rows,
            hasContacts: rows.length > 0
        })
    })
    .catch( (err) =>{
        console.log(err)
        res.status(500).redirect('/')
    })
}

exports.POSTcontacts = (req, res, next) => {
    const tempContact = new Contact(null, req.body.first_name, req.body.last_name, req.body.phone)
    tempContact.save()
    .then( result => res.redirect('/sql-contact') )
    .catch( err => console.log(err))
}

exports.DELETEcontacts = (req,res,next)=>{
    Contact.deleteByID(req.params.id)
    .then (results => res.sendStatus(204))
    .catch(err => console.log(err))
}