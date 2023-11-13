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
    // Get the weather of the given location
    getWeather(searchQuery);
}

//Create new query button
function newCityButton(cityName) {
    console.log(cityName);

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