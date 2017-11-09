// Create a function which is a "controller", it
// handles a request, writing the response.
function newevent(request, response) {
    response.render('newevent', { title: 'New Event' });
}

module.exports = {
    newevent,
};