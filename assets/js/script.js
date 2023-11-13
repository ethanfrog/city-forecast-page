var searchBar = $('#search-bar');
var searchButton = $('#search-button');

var savedSearchDiv = $('#saved-searches');

searchButton.on('click', showClick);

createSavedButtons();

function showClick() {
    var searchQuery = searchBar.val();
    // Save new query to local storage
    saveToLocalStorage(searchQuery);
    // Create new query button
    newCityButton(searchQuery);
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

//Create buttons from local storage
function createSavedButtons() {
    for (i = 0; i < localStorage.length; i++) {
        newCityButton(localStorage.key(i));
    }
}