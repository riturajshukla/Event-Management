const eventModels = require('../models/events.js');
const validator = require('validator');

// Create a function which is a "controller", it
// handles a request, writing the response.
const possibleDateData = {
    year: [2017, 2018],
    month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    day: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31,
    ],
    hour: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ],
    minute: [0, 30],
};

function newevent(request, response) {
    const errors = [];
    if (request.method === 'POST') {
        if (validator.isLength(request.body.title, { min: 1, max: 50 }) === false) {
            errors.push('Bad title - BOOO ON YOU');
        }
        if (validator.isLength(request.body.location, { min: 1, max: 50 }) === false ) {
            errors.push('Bad location - SHAME');
        }
        if (validator.isURL(request.body.image) === false ) {
            errors.push('That is not a URL');
        }
        if (validator.matches(request.body.image, ".png") === false &&
            validator.matches(request.body.image, ".jpg") === false &&
            validator.matches(request.body.image, ".gif") === false) {
            errors.push('Definitely not an image');
        }
        
        if (errors.length === 0) 
            {
            //CONNECTION TO DATABASE LATER
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
                    console.log('New Event Insert Executed'); // print data;
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
            else{
                response.render('newevent', {possibleDateData,errors});
            }
    }
     else{
                response.render('newevent', {possibleDateData,errors});
    }

}

module.exports = {
    newevent
};
