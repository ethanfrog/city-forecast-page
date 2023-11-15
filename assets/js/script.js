// Search bar elements
var searchBar = $('#search-bar');
var searchButton = $('#search-button');

// The area where previously searched city buttons will be placed
var savedSearchDiv = $('#saved-searches');

// The areas where weather data is displayed
var weatherHeaderBlock = $('#weatherHeader');
var weatherBlock = $('#weather');

var forecastHeaderBlock = $('#forecastHeader');
var forecastBlocks = [$('#forecast-1'), $('#forecast-2'), $('#forecast-3'), $('#forecast-4'), $('#forecast-5')];

// My OpenWeather API key
var key = "c7cd1d281114a995fffcd325175b8a5e";

// Pull and display saved cities from local storage
createSavedButtons();

// Process a search request when the generic Search button is clicked
searchButton.on('click', searchForCity);

// Perform a specfic search request when a designated city button is clicked
savedSearchDiv.on('click', function(event) {
    var savedButton = $(event.target);
    var savedCity = savedButton.html();

    // Get the weather and 5-day forecast of the saved city
    getWeather(savedCity);
    getForecast(savedCity);
});



// Create buttons from local storage data
function createSavedButtons() {
    for (i = 0; i < localStorage.length; i++) {
        newCityButton(localStorage.key(i));
    }
}

// Use the contents of the search bar to perform a weather search
function searchForCity() {
    var searchQuery = searchBar.val();

    // Don't proceed if the search bar is empty
    if (searchQuery !== "") {
        // Create a new city button, only if a button for city doesn't already exist
        var createButton = true;
        for (i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) == searchQuery) {
                createButton = false;
            }
        }
        if (createButton) {
            newCityButton(searchQuery);
        }
    
        // Save new city query to local storage
        saveToLocalStorage(searchQuery);
    
        // Get the weather and 5-day forecast of the given city
        getWeather(searchQuery);
        getForecast(searchQuery);
    }
}

// Create and display a city search button
function newCityButton(cityName) {
    var newButton = $('<button>');

    newButton.attr('class', 'cityButton');
    newButton.html(cityName);

    savedSearchDiv.append(newButton);
}

// Save new query to local storage
// City name is stored as the key, weather data could potentially be stored as the key's content
function saveToLocalStorage(cityName) {
    localStorage.setItem(cityName, JSON.stringify(" "));
}

// Call the OpenWeather API to get the current weather of the given city, then display it on the webpage
function getWeather(cityName) {
    // Get the current date and set the title of the weather block section
    var currentDateObject = dayjs();
    var currentDateText = currentDateObject.format('YYYY-MM-DD');

    weatherHeaderBlock.html(cityName + "'s Weather on " + currentDateText);

    // Call OpenWeather
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key + "&units=imperial";
    fetch(url)
        // Convert OpenWeather data to JSON format
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Extract temperature, wind speed and humidity
            var temp = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;
            // Write weather values to the weather block
            weatherBlock.html("Temperature: " + temp +
                "\u00B0 F<br>Wind speed: " + windSpeed +
                " MPH<br>Humidity: " + humidity + "%");
        })
}

// Call the OpenWeather API to get the 5-day forecast of the given city, then display it on the webpage
function getForecast(cityName) {
    // Set the title of the forecast block section
    forecastHeaderBlock.html(cityName + "'s 5-Day Forecast");

    // Call OpenWeather
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key + "&units=imperial";
    fetch(url)
        // Convert OpenWeather data to JSON format
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Go through the first 5 days of data
            for (i = 0; i <= 32; i += 8) {
                forecastData = data.list[i];
                // Extract date, temperature, wind speed and humidity
                var date = forecastData.dt_txt.split(" ")[0];
                var temp = forecastData.main.temp;
                var windSpeed = forecastData.wind.speed;
                var humidity = forecastData.main.humidity;
                // Write weather values to the forecast blocks
                forecastBlocks[i / 8].html(date +
                    "<br><br>Temperature: " + temp +
                    "\u00B0 F<br>Wind speed: " + windSpeed +
                    " MPH<br>Humidity: " + humidity + "%");
            }
        })
}