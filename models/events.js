var allEvents = [];

function getById(id, callback) {

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
        console.log("Events Connected!");// success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });    


var sql = "select * from events where id="+id;
console.log(sql);
db.any(sql)
    .then(data => {
        allEvents=data;
        console.log("Events Executed");
        callback(data);

  
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
   
    });
     pgp.end();

}

function abTest() {
    var random_boolean = Math.random() >= 0.5;
    var linkText = 'TEST';
    if (random_boolean) {
        linkText = 'Donate';
    } else {
        linkText = 'Support';
    }
    return linkText;
}

module.exports = {
    getById,
    abTest,
};
