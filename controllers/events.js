const eventModels = require('../models/events.js');
const attendeeModels = require('../models/attendees.js');

// Create a function which is a "controller", it
// handles a request, writing the response.
function eventDetail(request, response) {
    const eventID = parseInt(request.params.eventID, 10);
    const event = eventModels.getById(eventID);
    if (event === null) {
        response.status(404).send('This is not a thing');
    } 
    else {
        const contextData = {
            title: 'This is an awesome event detail page',
            event: eventModels.getById(eventID),
            attendees: attendeeModels.attendeesgetById(eventID),
            donation: eventModels.abTest(),
        };
        
    response.render('event-detail', contextData);
    }
}

module.exports = {
    eventDetail,
};
