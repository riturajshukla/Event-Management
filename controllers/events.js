const eventModels = require('../models/events.js');
const attendeeModels = require('../models/attendees.js');
var asyncStuff = require('async');

function eventDetail(request, response) {
    
    const eventID = parseInt(request.params.eventID, 10);
    var event;
    var attendees;
    asyncStuff.series([ 
        
        function(callback) {
               eventModels.getById(eventID, function(eventdata) {
                    event = eventdata[0];
                    console.log('task 1');
                  console.log(request.query.var);
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
                donation: "Donate",
                };
                
                /*add here*/
             if (request.query.var==="1") {
                 contextData.donation = "Support";
             }  else{
                 contextData.donation = "Donate";
             } 
                
            response.render('event-detail', contextData);
        });
    
    
}


module.exports = {
    eventDetail,
   // eventSupport,
};
