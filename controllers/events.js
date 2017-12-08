const eventModels = require('../models/events.js');
const attendeeModels = require('../models/attendees.js');
var asyncStuff = require('async');

function eventDetail(request, response) 
{
    const eventID = parseInt(request.params.eventID, 10);
    var event;
    var attendees;
    asyncStuff.series
    ([ 
        function(callback) 
        {
            eventModels.getById(eventID, function(eventdata) 
               {
                    event = eventdata[0];
                    console.log('task 1');
                    callback();
                }
                );
        },
        function(callback) 
        {
            attendeeModels.attendeesgetById(eventID, function(attendeesdata) 
                {
                    attendees = attendeesdata;
                    console.log('task 2');
                    callback();
                }
                );
            }
        ],
        function(err) 
        { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return (err);
            const contextData = 
                {
                    title: event.title,
                    event: event,
                    attendees: attendees,
                    donation: "Donate",
                };
                if (request.query.var==="1") 
                {
                    contextData.donation = "Support";
                }  
                else
                {
                     contextData.donation = "Donate";
                } 
            response.render('event-detail', contextData);
            console.log('task 3');
        });
};

function RSVPcheck(request, response) 
{
    const RSVPerrors = [];
    const eventID = parseInt(request.params.eventID, 10);
    console.log("RSVP Start");      
    if (request.method === 'POST') 
    {
        var email = request.body.email;
        var eventid=request.body.eventid;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var string = email.toLowerCase();
        var substring = "@yale.edu";
        if (string.match(mailformat) === false) 
        {
            RSVPerrors.push('Not an email address, buddy');
            console.log('Not an email address');
        }
        else if (string.toString().indexOf(substring.toString()) === -1) 
        {
            RSVPerrors.push('You are not from Yale, dude');
            console.log('Not Yale.edu');
        } 
        else 
        {
             
            //DATABASE CONNECTION
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
            
            var sql8 = "INSERT INTO attendees (emailid, regevent) VALUES ('"+email+"', '"+eventid+"')";
            db.any(sql8)
                .then(data => {
                    console.log('RSVP Executed'); // print data;
            })
                .catch(error => {
                    console.log('ERROR:', error); // print the error;
                });
            
            //INSERT END
         }
    }
       // DISPLAY PAGE START
            var event;
            var attendees;
            asyncStuff.series
            ([ 
                function(callback) 
                {
                    eventModels.getById(eventID, function(eventdata) 
                       {
                            event = eventdata[0];
                            console.log('rsvp page task 1');
                            callback();
                        }
                        );
                },
                function(callback) 
                {
                    attendeeModels.attendeesgetById(eventID, function(attendeesdata) 
                        {
                            attendees = attendeesdata;
                            console.log('rsvp page task 2');
                            callback();
                        }
                        );
                    }
                ],
                function(err) 
                { //This function gets called after the two tasks have called their "task callbacks"
                    if (err) return (err);
                    const contextData = 
                        {
                            title: event.title,
                            event: event,
                            attendees: attendees,
                            donation: "Donate",
                            RSVPerrors: RSVPerrors
                        };
                        if (request.query.var==="1") 
                        {
                            contextData.donation = "Support";
                        }  
                        else
                        {
                             contextData.donation = "Donate";
                        } 
                    response.render('event-detail', contextData);
                    console.log('rsvp page task 3');
                });
            //DISPLAY END
 
}
function eventSupport(request, response) {
    
    const eventID = parseInt(request.params.eventID, 10);
    var event;
    var attendees;
    asyncStuff.series([ 
        
        function(callback) {
               eventModels.getById(eventID, function(eventdata) {
                    event = eventdata[0];
                    console.log('task 1');
                //    console.log(event);
                    callback();
                });
            },
         function(callback) {
                attendeeModels.attendeesgetById(eventID, function(attendeesdata) {
                    attendees = attendeesdata;
                    console.log('task 2');
                    callback();
                });
            }
        ],

    function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return (err);
            const contextData = 
                {
                title: event.title,
                event: event,
                attendees: attendees,
                donation: eventModels.abTest(),
                };
        response.render('event-detail-support', contextData);
        });
};



module.exports = 
{
    eventDetail,
    eventSupport,
    RSVPcheck
};