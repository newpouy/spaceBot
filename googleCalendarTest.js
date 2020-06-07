//var moment = require("moment"),
var    googleapis = require("googleapis"),
    googleCal = googleapis.calendar("v3");
    serviceEmail = "spacebot-1305@appspot.gserviceaccount.com",
    serviceKeyFile = "./spaceBot-224968307243.json";

var authClient = new googleapis.auth.JWT(
        serviceEmail,
        serviceKeyFile,
        null,
        ["https://www.googleapis.com/auth/calendar"]
    );

authClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
    } else {
        //console.log(tokens);
        googleCal.events.list({
            auth: authClient,
            calendarId: ""
        }, function (err, CL) {
            if (err) {
                console.log(err);
            } else {
                console.log(CL.items);
            }
        });
    }
})

googleCal.events.insert({
    auth: authClient,
    calendarId: "",
    resource: {
        start: {
          dateTime: "2016-05-10T09:30:00+09:00",
          timeZone: "Asia/Seoul"
        },
        end: {
          dateTime: "2016-05-10T11:30:00+09:00",
          timeZone: "Asia/Seoul"
        },
        summary: "winning @ life",
        description: "winning @ life description"
    }
}, function (err, something) {
    if (err) {
        console.log(err);
    } else {
        console.log(something);
        // do something else
    }
})
