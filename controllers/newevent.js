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
        
        if (errors.length === 0) {
            //CONNECTION TO DATABASE LATER
            }
    }
    response.render('newevent', {
        possibleDateData,
        errors,
    });
}

module.exports = {
    newevent,
};
