var searchBar = $('#search-bar');
var searchButton = $('#search-button');

var savedSearchDiv = $('#saved-searches');

var weatherHeaderBlock = $('#weatherHeader');
var weatherBlock = $('#weather');

var forecastHeaderBlock = $('#forecastHeader');
var forecastBlocks = [$('#forecast-1'), $('#forecast-2'), $('#forecast-3'), $('#forecast-4'), $('#forecast-5')];

createSavedButtons();

searchButton.on('click', searchForCity);

//Create buttons from local storage
function createSavedButtons() {
    for (i = 0; i < localStorage.length; i++) {
        newCityButton(localStorage.key(i));
    }
}

function searchForCity() {
    var searchQuery = searchBar.val();
    // Save new query to local storage
    saveToLocalStorage(searchQuery);
    // Create new query button
    newCityButton(searchQuery);

    // Set the title of the weather block section
    var currentDateObject = dayjs();
    var currentDateText = currentDateObject.format('YYYY-MM-DD');

    weatherHeaderBlock.html(searchQuery + "'s Weather on " + currentDateText);

    // Get the weather of the given city
    getWeather(searchQuery);

    forecastHeaderBlock.html(searchQuery + "'s 5-Day Forecast");

    // Get the 5-day forecast of the given city
    getForecast(searchQuery);
}

//Create new query button
function newCityButton(cityName) {
    var newButton = $('<button>');
    newButton.html(cityName);

    savedSearchDiv.append(newButton);
}

//Save new query to local storage
function saveToLocalStorage(cityName) {
    localStorage.setItem(cityName, JSON.stringify(" "));
}

function getWeather(cityName) {
    var city = cityName;
    var key = "c7cd1d281114a995fffcd325175b8a5e";

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=imperial";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //var date;
            var temp = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;

            weatherBlock.html("Temperature: " + temp+ "\u00B0 F<br>Wind speed: " + windSpeed + " MPH<br>Humidity: " + humidity + "%");
        })
}

function getForecast(cityName) {
    var city = cityName;
    var key = "c7cd1d281114a995fffcd325175b8a5e";

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i <= 32; i += 8) {
                forecastData = data.list[i];

                var date = forecastData.dt_txt.split(" ")[0];
                var temp = forecastData.main.temp;
                var windSpeed = forecastData.wind.speed;
                var humidity = forecastData.main.humidity;

                forecastBlocks[i / 8].html(date + "<br><br>Temperature: " + temp + "\u00B0 F<br>Wind speed: " + windSpeed + " MPH<br>Humidity: " + humidity + "%");
            }
        })
}