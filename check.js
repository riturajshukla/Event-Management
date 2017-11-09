'use strict';

const con = {
  host: 'localhost',
  user: 'ubuntu',
  password: 'milestone',
  database: 'ubuntu'

};

const options = {
    noWarnings: true
};

var pgp = require('pg-promise')(options);

const db=pgp(con);
//console.log(db);


/*
 db.any('select * from events', [true])
    .then(data => {
        console.log('DATA:', data); // print data;
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });
pgp.end();*/

db.connect()
    .then(function (obj) {
        obj.done();
        console.log("Connected!");// success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });