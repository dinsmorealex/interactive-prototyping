
//email 
var Imap = require('imap'),
inspect = require('util').inspect;

var imap = new Imap({
  user: '////////',
  password: '/////////',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
var d = new Date();
var fs = require('fs'), fileStream;

//instagram
Instagram = require('instagram-node-lib');

Instagram.set('client_id', '/////////////');
Instagram.set('client_secret', '////////////////');
Instagram.set('callback_url', '////////////////');

//weather 
request = require("request"),
currentCity = "Brooklyn",


countryCode= "NY",

temperatureFormat= "F";

 //FACEBOOK

 var http = require("http");
 var sys = require("sys");
 var events = require("events");
 var url = require("url");
 var path = require("path");
 var fs = require('fs');

// Input variables
var ping_int = 2000;
var waitTime = 5; // minutes
var throttle_int = 1000 * 60 * waitTime; // for readability

// Facebook
var data_host = 'graph.facebook.com';
var data_path = '/////////////'; // replace with your ID

var httpOptions = { host: data_host, port: 80, path: data_path, method: 'GET' };

// Output variables (static text files)
var count_db = "../data/count.txt"; // you create this yourself

// Build variables
var result_emitter = new events.EventEmitter();

// Listen for updates
var listener = result_emitter.on("data", function(outcome) {
  if (outcome === 200) { setTimeout( get_data, ping_int ); }
  // The response failed, throttle requests
  else {
    var reqDate = new Date();
    console.log("Throttle connection for " + throttle_int + "ms (" + waitTime + "mins). " + reqDate);
    setTimeout( get_data, throttle_int );
  }
  // Log error
},
"error", function(error) {
  console.log("A result_emitter error has been caught");
  console.log("Carry on...");
  // Log exception
},
"uncaughtException", function(uncaughtException) {
  console.log("An uncaught exception has been caught");
  console.log("Carry on...");
});
/////facebook///////


function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.on('ready', function() {
  setInterval(function() { 

//INSTAGRAM
Instagram.tags.info({
  name: '////////',
  complete: function(data){
    console.log(data);
  }
});


 //EMAIL
 openInbox(function(err, box) {

  if (err) throw err;
  imap.search([ 'UNSEEN', ['SINCE', d] ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results);

    f.on('message', function(msg, seqno) {    
    });
    f.on('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.on('end', function() {


      console.log("number of unread messages "+results.length);

    });
  });
});

//WEATHER
request("http://api.openweathermap.org/data/2.5/weather?q="+currentCity+","+countryCode.toLowerCase()+"", function(error, response, body) {
        // Send a message back to the
        // terminal if great success 
       // console.log("Request Successful");
       weatherData = JSON.parse(body);

       city = weatherData.name;

       if (temperatureFormat === "C") {

            // Store the current temperature, 
            // High and Low for the day.

            temperature = kelvinToCelsius(weatherData.main.temp);
            temperatureLow = kelvinToCelsius(weatherData.main.temp_min);
            temperatureHigh = kelvinToCelsius(weatherData.main.temp_max);

          } else if (temperatureFormat === "F") {

            temperature = kelvinToFahrenheit(weatherData.main.temp);
            temperatureLow = kelvinToFahrenheit(weatherData.main.temp_min);
            temperatureHigh = kelvinToFahrenheit(weatherData.main.temp_max);

          } else {

            throw "Invalid Temperature Format!";

          }



          description = weatherData.weather[0].description;
          console.log(currentCity, "current temperature-",temperature);

        //fireItUp(); // Send weather data to the screen
      });

console.log("event triggered!"); }, 3000);
});


//FACEBOOK -- put this function in main event timer.
function get_data() {

  var reqDate = new Date();
  var request = http.request( httpOptions );

  request.addListener("response", function(response) {

      //console.log("GET request sent: " + reqDate);

      response.setEncoding('utf8');
      var body = "";

      response.addListener("data", function(data) {
        body += data;
      });

      response.addListener("end", function() {

        var data        = JSON.parse(body);
        var result      = Math.round(data.likes);
        console.log("facebook likes: " + result);

          // READING FROM FILES
          var file_check  = fs.existsSync(count_db);
          if (file_check) {
              // Read stored value
              var old_val             = fs.readFileSync(count_db, 'utf8');
              console.log("old value: " + old_val);

              // If the new value is different than the last time we checked
              if (result !== old_val) {
                console.log("new_val: " + result);
                  // Write result to staic DB (text file)
                  fs.writeFileSync(count_db, result, 'utf8');
                  console.log("DBs updated: " + reqDate + " with " + result);
                }
              }
            });

      result_emitter.emit("data", response.statusCode);
    });
request.end();
}



imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});
imap.connect();

// Start requesting data
get_data();

function kelvinToFahrenheit(input) {
  input = (input - 273.15) * 1.8000 + 32.00;
  return parseInt(input);
}
