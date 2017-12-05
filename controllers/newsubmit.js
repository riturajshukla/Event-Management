
// Create a function which is a "controller", it
// handles a request, writing the response.
function newsubmit(request, response) {

var etitle=request.body.title;
var elocation=request.body.location;
var eimageurl=request.body.image;
var edate=request.body.day+"/"+request.body.month+"/"+request.body.year;
var eminute=request.body.minute;
if (eminute == "0")
{
    eminute= "00";
}
if(request.body.hour>12)
{
    var etime=request.body.hour+":"+eminute+"pm";
}
else
{
    var etime=request.body.hour+":"+eminute+"am";
}
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
        
        
       var sql8 = "INSERT INTO events (title, location, imageurl, date, time) VALUES ('"+etitle+"', '"+elocation+"', '"+eimageurl+"','"+edate+"','"+etime+"')";
        db.any(sql8)
            .then(data => {
                console.log('New Event Inserted Executed'); // print data;
                response.render('newsubmit', { title: 'New Event Registered'});
        })
            .catch(error => {
                console.log('ERROR:', error); // print the error;
            });
        
        pgp.end();
  
}

module.exports = {
    newsubmit,
};
