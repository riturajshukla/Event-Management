
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    
/*var mysql = require('mysql');

var con = mysql.createConnection
({
  host: "localhost",
  user: "yabadabadoo",
  password: "", 
  database:"mydb"
});

con.connect(function(err) {
  if (err) throw err;
//  console.log("Connected!");
//  var sql = "CREATE TABLE events (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), location VARCHAR(255), imageurl VARCHAR(255), date VARCHAR(15), time VARCHAR(15))";
//  var sql = "DROP TABLE events";
//  var sql = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Party Night', 'New Haven', 'event1.jpg','20/Nov/2017','2:00pm')";
//    var sql2 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('Disco Night', 'New Haven', 'event2.jpg','21/Nov/2017','10:00pm')";
    var sql="SELECT * FROM events"
    con.query(sql, function (err, rows, fields) {
    if (err) throw err;
  //  console.log(rows); 
    response.render('index', { title: 'Golden Wrath Event Management', items: rows});
});
 /*   con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Query executed");
    console.log(result); }); */
//});
    response.render('index', { title: 'Golden Wrath Event Management'});

}

module.exports = {
    index,
};
