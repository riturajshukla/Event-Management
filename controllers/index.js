
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    response.render('index', { title: 'Golden Wrath Event Management' });
}

module.exports = {
    index,
};
