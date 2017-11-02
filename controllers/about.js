// Create a function which is a "controller", it
// handles a request, writing the response.
function about(request, response) {
    response.render('about', { title: 'About' });
}

module.exports = {
    about,
};
