const eventModels = require('../models/events.js');
const attendeeModels = require('../models/attendees.js');
var asyncStuff = require('async');
// Create a function which is a "controller", it
// handles a request, writing the response.
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
                    console.log(attendees);
                    callback();
                });
            }
        ],
        
     
    function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return (err);
            const contextData = 
                {
                title: 'This is an awesome event detail page',
                event: event,
                attendees: attendees
                };
            response.render('event-detail', contextData);
        });
    
    
}

module.exports = {
    eventDetail,
};



    
