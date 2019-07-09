const Contact = require('../models/Contact')

exports.GETcontacts = (req, res, next) => {
    Contact.findAll().then( contacts => {
        res.render('contact', {
            contacts: contacts,
            hasContacts: contacts.length > 0    //The view uses this to decide how much table to show
        })
    })
    .catch( (err) =>{
        console.log(err)
        res.status(500).redirect('/')
    })
}

exports.POSTcontacts = (req, res, next) => {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const phone = req.body.phone;
    
    //check for bad data and send back a fail code if anything is missing
    if(!first_name || !last_name || !phone){
        console.log(`Got Null data: \n1st: ${first_name}\nlast: ${last_name}\nphone:${phone}`)
        return res.status(400);
    }

    //if all fields have some data:
    Contact.create({
        firstName: first_name,
        lastName: last_name,
        phone: phone
    })
    .then(result => {
        //console.log("Contact saved! " + result);
        res.redirect('/sql-contact')
    })
    .catch(err => {
        console.log("Error saving contact: " + err)
    });
}

exports.DELETEcontacts = (req,res,next)=>{
    const contactID = req.params.id;
    Contact.findByPk(contactID)
    .then(contact =>{
        return contact.destroy();
    })
    .then(result => {
        res.sendStatus(204);
    })
    .catch(err =>{
        console.log("Error deleting contact: " + console.err);        
    })
}