
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {

const con = {
  host: 'ec2-107-22-162-82.compute-1.amazonaws.com',
  user: 'xrxlcgkeiqnbpa',
  password: '4bd2b4bff69cb3c5ad99eb6297dee3ea3b0e4cb9db5d0e53061f18f49165762d',
  database: 'ddvbg4h4mr6qc7',
  port:'5432'

};

const options = {
    noWarnings: true
};

var pgp = require('pg-promise')(options);

const db=pgp(con);
//console.log(db);


db.connect()
    .then(function (obj) {
        obj.done();
        console.log("Connected!");// success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });    

var sql = "select * from events";
var sql2 = "DROP TABLE events";
var sql3 = "CREATE TABLE events (id SERIA PRIMARY KEYL, title VARCHAR(255), location VARCHAR(255), imageurl VARCHAR(255), date VARCHAR(15), time VARCHAR(15))";
var sql4 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Party Night', 'New Haven', 'event1.jpg','20/Nov/2017','2:00pm')";
var sql5 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Disco Night', 'New Haven', 'event2.jpg','21/Nov/2017','10:00pm')";
db.any(sql3)
    .then(data => {
        console.log('Executed', data[0].id); // print data;
        response.render('index', { title: 'Golden Wrath Event Management', items: data});
})
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });

pgp.end();


//var sql = "CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), location VARCHAR(255), imageurl VARCHAR(255), date VARCHAR(15), time VARCHAR(15))";
//  var sql = "DROP TABLE events";
//  var sql = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Party Night', 'New Haven', 'event1.jpg','20/Nov/2017','2:00pm')";
//    var sql2 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Disco Night', 'New Haven', 'event2.jpg','21/Nov/2017','10:00pm')";







}

module.exports = {
    index,
};
