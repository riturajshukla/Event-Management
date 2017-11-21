
// Create a function which is a "controller", it
// handles a request, writing the response.
function rsvp(request, response) {

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

var email=request.body.email;
var eventid=request.body.eventid;

//var sql = "select * from events";
var sql8 = "INSERT INTO attendees (emailid, regevent) VALUES ('"+email+"', '"+eventid+"')";
//console.log(sql8);
db.any(sql8)
    .then(data => {
        console.log('RSVP Executed'); // print data;
        response.render('rsvp', { title: 'Registered'});
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
    rsvp,
};
