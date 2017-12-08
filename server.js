'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Import our controllers from their files. Notice how we're
// giving the `require` built-in function the path a file
// locally instead of a dependency that was installed as
// specified in our `package.json` file, like "express".
const indexControllers = require('./controllers/index.js');
const aboutControllers = require('./controllers/about.js');
const donateControllers = require('./controllers/donate.js');
const neweventControllers = require('./controllers/newevent.js');
const eventControllers = require('./controllers/events.js');
const rsvpControllers = require('./controllers/rsvp.js');
const newsubmitControllers = require('./controllers/newsubmit.js');
const apiControllers = require('./controllers/api.js');


// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');

// Through this configuration, Nunjucks will "tell"
// our Express app that it is handling the templates,
// so that when we call the `render` function on a
// response object, it will rely on Nunjucks.
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');

// Now, attach our "controllers" to our "routes".
app.get('/', indexControllers.index);
app.get('/about', aboutControllers.about);
app.get('/donate', donateControllers.donate);
app.get('/events/new', neweventControllers.newevent);
app.post('/events/new', neweventControllers.newevent);
app.get('/events/:eventID', eventControllers.eventDetail);
app.get('/events/:eventID/var', eventControllers.eventSupport);
app.post('/events/:eventID', rsvpControllers.RSVP);
//app.post('/events/rsvp', rsvpControllers.rsvp);
app.post('/events/newsubmit', newsubmitControllers.newsubmit);
app.get('/api/events', apiControllers.api);


app.get('/index.html', indexControllers.index);
var serveStatic = require('serve-static');
app.use(serveStatic('views'));
// Start up the application and listen on the specified
// port, or default to port 4000.
app.listen(process.env.PORT || 4000);


