var five = require("johnny-five");
var myBoard, redLed, greenLed, blueLed, request;

 request = require("request"),
   

myBoard = new five.Board();

 currentCity = "Brooklyn",


 countryCode= "NY",

 temperatureFormat= "F",

myBoard.on("ready", function() {

	 

  redLed = new five.Led(9)
  greenLed = new five.Led(10)
  blueLed = new five.Led(11)

  // try "on", "off", "toggle", "brightness",
  // "fade", "fadeIn", "fadeOut", 
  // "pulse", "strobe", 
  // "stop" (stops strobing, pulsing or fading)


    request("http://api.openweathermap.org/data/2.5/weather?q="+currentCity+","+countryCode.toLowerCase()+"", function(error, response, body) {

        // Send a message back to the
        // terminal if great success (yakshemash).

        console.log("Request Successful");

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

        // This is a literal description
        // such as mist, partly cloudy, etc.

        description = weatherData.weather[0].description;

        fireItUp(); // Send weather data to the screen
    });

});

function fireItUp() {

	console.log(currentCity, "current temperature-",temperature);

	if(temperature < 10){
		
blueLed.Pulse();
		
	}
	if (temperature >10 &&  temperature< 20){
		blueLed.pulse();
	}

	if (temperature >20 && temperature<25)
{
	blueLed.pulse();
	greenLed.pulse();
	
}
 if (temperature >25 && temperature < 30)
 {
 	blueLed.pulse();
 	redLed.pulse();
 }
        // Here we see our custom degree
        // symbol come to life.

        // Print the city name and current temp
        // on row 1 of the LCD.

        
}



function kelvinToFahrenheit(input) {
    input = (input - 273.15) * 1.8000 + 32.00;
    return parseInt(input);
}