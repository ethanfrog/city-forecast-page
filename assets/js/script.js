var searchBar = $('#search-bar');
var searchButton = $('#search-button');

var savedSearchDiv = $('#saved-searches');

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

    // Get the weather of the given city
    //getWeather(searchQuery);

    // Get the 5-day forecast of the given city
    getForecast(searchQuery);
}

//Create new query button
function newCityButton(cityName) {
    //console.log(cityName);

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

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&per_page=5";

    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

function getForecast(cityName) {
    var city = cityName;
    var key = "c7cd1d281114a995fffcd325175b8a5e";

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial";

    //console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i <= 32; i += 8) {
                forecastData = data.list[i];

                console.log(forecastData);

                var date = forecastData.dt_txt.split(" ")[0];
                var temp = forecastData.main.temp;
                var windSpeed = forecastData.wind.speed;
                var humidity = forecastData.main.humidity;

                console.log(date);
                console.log(temp);
                console.log(windSpeed);
                console.log(humidity);
            }
        })
}