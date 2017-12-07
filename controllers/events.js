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
                donation: eventModels.abTest()
                };
                
                /*add here*/
                
                
            response.render('event-detail', contextData);
            console.log('task 3');
        });
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
                donation: eventModels.abTest()
                };
                
                /*add here*/
                
                
            response.render('event-detail-support', contextData);
        });
    
    
}
module.exports = {
    eventDetail,
    eventSupport,
};
