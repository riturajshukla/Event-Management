
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {

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
var sql3 = "CREATE TABLE events (id SERIAL PRIMARY KEY, title VARCHAR(255), location VARCHAR(255), imageurl VARCHAR(255), date VARCHAR(15), time VARCHAR(15))";
var sql4 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('New Century Party on Mars', 'Mars', 'event0.jpg','1/January/2100','19:00pm')";
var sql5 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Underwater Party', 'Pacific Ocean', 'event1.jpg','5/May/2018','17:00pm')";
var sql6=" ALTER SEQUENCE events_id_seq minvalue 0 RESTART WITH 0 INCREMENT BY 1 ";

var sql7 = "CREATE TABLE attendees (emailid VARCHAR(255), regevent INT)";
var sql8 = "INSERT INTO attendees (emailid, regevent) VALUES ('rituraj.shukla@yale.edu', '0')";
var sql9 = "DELETE FROM attendees where emailid = 'rituraj.shukla@yale.edu'";


db.any(sql)
    .then(data => {
        console.log('Executed'); // print data;
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
