'use strict';
var allattendees=[];

function attendeesgetById(id, callback) {
    
    const con = {
  host: 'ec2-107-22-162-82.compute-1.amazonaws.com',
  user: 'xrxlcgkeiqnbpa',
  password: '4bd2b4bff69cb3c5ad99eb6297dee3ea3b0e4cb9db5d0e53061f18f49165762d',
  database: 'ddvbg4h4mr6qc7',
  port:'5432',
  ssl: 'TRUE'

};


const options = {
    noWarnings: true
};

var pgp = require('pg-promise')(options);

const db=pgp(con);

db.connect()
    .then(function (obj) {
        obj.done();
        console.log("Attendees Connected!");// success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });

var sql = "select * from attendees where regevent="+id;
//console.log(sql);
db.any(sql)
    .then(data => {
       allattendees=data;
        console.log("Attendees Executed");
        callback(data);
         // print data;
    })
    .catch(error => {
        console.log('ERROR:', error);
    });

pgp.end();
}

module.exports = {
    attendeesgetById,
};
