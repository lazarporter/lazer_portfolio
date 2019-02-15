exports.GETcontacts = (req, res, next) => {
    res.render('contact', {
        contacts: contactList,
        hasContacts: contactList.length > 0
    })
}

exports.POSTcontacts = (req, res, next) => {
    //build the query to add the relevent contact to the table
    queryString = "INSERT INTO contactlist VALUES (\"" + req.body.first_name + "\",\"" + req.body.last_name + "\",\"" + req.body.phone + "\");"

    //send the query to add the new person to the DB
    connection.query({
        sql: queryString,
        timeout: 60000
    }, function (error, results, fields) {
        if (error) throw error;

        //If successfull, query the table and get the updated list
        queryString = "SELECT * FROM contactlist;"
        connection.query({
            sql: queryString,
            timeout: 60000
        }, function (error, results, fields) {
            if (error) throw error;

            //save the updated list in memory
            contactList = results.slice()

            res.status(200).redirect('/sql-contact');
        });
    });
}