const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"shehap",
    database:"store" //schema
});

db.connect((nil) => {
    if(nil) {
        throw nil;
    } else {
        console.log('DB Connected...');
    }
});

module.exports = db;