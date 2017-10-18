var init = function () {
  var url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url);
  this.layOutCountry();
}

var makeRequest = function(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener( "load", function() {
    var countries = JSON.parse(this.responseText);
    addCountriesToDropDown( countries );
  });
  request.send();
}

var addCountriesToDropDown = function(countries) {
  var select = document.querySelector('#country-drop-down');
  countries.forEach(function(country, index) {
    var option = document.createElement("option");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
  select.addEventListener('change', function() {
    var div = document.querySelector('#individual-country');
    div.innerHTML = "";
    var nameHeading = document.createElement("h1");
    nameHeading.innerText = countries[this.value].name;
    var populationP = document.createElement("p");
    populationP.innerText = "The population of " + countries[this.value].name + " is " + countries[this.value].population
    var capitalCityP = document.createElement("p");
    capitalCityP.innerText = "The capital of " + countries[this.value].name + " is " + countries[this.value].capital
    div.appendChild(nameHeading);
    div.appendChild(populationP);
    div.appendChild(capitalCityP);
    var jsonString = JSON.stringify(countries[this.value]);
    localStorage.setItem('country', jsonString);
  });
}

var layOutCountry = function() {
  var jsonString = localStorage.getItem('country');
  var savedCountry = JSON.parse(jsonString);
  if (!savedCountry) return;
  var div = document.querySelector('#individual-country');
  var nameHeading = document.createElement("h1");
  nameHeading.innerText = savedCountry.name;
  var populationP = document.createElement("p");
  populationP.innerText = "The population of " + savedCountry.name + " is " + savedCountry.population
  var capitalCityP = document.createElement("p");
  capitalCityP.innerText = "The capital of " + savedCountry.name + " is " + savedCountry.capital
  div.appendChild(nameHeading);
  div.appendChild(populationP);
  div.appendChild(capitalCityP);
}


window.addEventListener('load', init);


// var addCountriesToList = function(countries) {
//   var ul = document.querySelector('#countries');
//   for (var country of countries) {
//     var li = document.createElement("li");
//     li.innerText = country.name + ", " + country.population + " people live here!";
//     ul.appendChild(li);
//   }
// }

// var button = document.getElementById('btn');
// button.addEventListener('click', function() {
//   makeRequest(url);
// })

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
  var div = document.getElementById("individual-country");
  div.innerHTML = "";
})
