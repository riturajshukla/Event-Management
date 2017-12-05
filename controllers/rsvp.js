
// Create a function which is a "controller", it
// handles a request, writing the response.
function rsvp(request, response) {

var email=request.body.email;
var eventid=request.body.eventid;
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
var string=email.toLowerCase();
var substring = "yale.edu";
console.log( string.match(mailformat));
console.log(string.toString().indexOf(substring.toString()));
if(string.toString().indexOf(substring.toString()) !== -1 && string.match(mailformat))
{
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
    }
    else
    {
        console.log('Invalid Email'); // print data;
        response.render('rsvp', { title: 'Invalid Email'});
        
    }

}

module.exports = {
    rsvp,
};
