
// Create a function which is a "controller", it
// handles a request, writing the response.
function newsubmit(request, response) {
console.log("New Submit Start");
var maxid=[];
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
            
            const db=pgp(con);
            db.connect()
            .then(function (obj) {
                obj.done();
                console.log("ReConnected!");// success, release connection;
            })
            .catch(function (error) {
                console.log("ERROR:", error.message);
            });    
            var sql7 = "select id from events where title='"+etitle+"'";
            db.any(sql7)
            .then(data1 => {
            maxid=data1;
            console.log(data1);
            console.log('New Event Inserted Executed'); // print data;
                response.redirect("/events/"+maxid[0].id);
                })
            .   catch(error => {
                    console.log('ERROR:', error); // print the error;
                });
        
        
                })
            .catch(error => {
                console.log('ERROR:', error); // print the error;
            });
        
        pgp.end();
  
}

module.exports = {
    newsubmit
};
