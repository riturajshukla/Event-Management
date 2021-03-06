const apieventModels = require('../models/apievents.js');
const apiattendeeModels = require('../models/apiattendees.js');
var asyncStuff = require('async');

function api(request, response) {
    
    const query =  request.query.search;
    var event;
    var attendees;
    var attendeeslistbyevent=[];
    var k;
    var a=[];
    asyncStuff.series([ 
        function(callback) {
               apieventModels.apigetById(query, function(eventdata) {
                    event = eventdata;
                    console.log('api task 1');
                    callback();
                });
            },
            
         function(callback) {
                apiattendeeModels.apiattendeesgetById(event, function(attendeesdata) {
                    attendees = attendeesdata;
                    console.log('api task 2');
                    for (let i = 0; i < event.length; i += 1) 
                    {
                        attendeeslistbyevent[i]="";
                        k=0;
                        a[i]=[];
                        for (let j = 0; j < attendees.length; j += 1) 
                        {
                            if(attendees[j].regevent===event[i].id)
                            {
                                
//                                if(attendeeslistbyevent[i])
  //                              {
                                   //  attendeeslistbyevent[i]=attendeeslistbyevent[i]+',"'+attendees[j].emailid+'"';
                                     a[i][k]=attendees[j].emailid;
                                     console.log(a[i][k]);
                                     k=k+1;
    //                            }
//                                else
  //                              {
    //                                attendeeslistbyevent[i]='"'+attendees[j].emailid+'"'; 
      //                          }
                            }
                        }
      //                  console.log("Event: "+event[i].title+" "+attendeeslistbyevent[i]);
                    }
                    
                    callback();
                });
            }
        ],

    function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return (err);
            const contextData = 
                {
                title: "API",
                event: event,
                attendees: a, 
                };
            response.render('api', contextData);
        });
    
}
module.exports = {
    api,
};
