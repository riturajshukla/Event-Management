// Create a function which is a "controller", it
// handles a request, writing the response.
function donate(request, response) {
    response.render('donate', { title: 'Thank you!' });
}

module.exports = {
    donate,
};
