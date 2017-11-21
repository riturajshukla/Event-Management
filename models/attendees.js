'use strict';
var allattendees=[];

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
        console.log("Connected!");// success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });

var sql = "select * from attendees";
db.any(sql)
    .then(data => {
       allattendees=data;
    //   console.log(allattendees);
         // print data;
    })
    .catch(error => {
        console.log('ERROR:', error);
    });

pgp.end();

function attendeesgetById(id) {
    var attendeelist=[];
    var j=0;
    for (let i = 0; i < allattendees.length; i += 1) 
    {
        if (id === allattendees[i].regevent) 
        {
            attendeelist[j]=allattendees[i];
            j=j+1;
        }
    }
    return attendeelist;
}

module.exports = {
    attendeesgetById,
};
