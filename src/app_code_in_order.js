let now = new Date();
let time = document.querySelector("#date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
time.innerHTML = `${day}, ${hours}:${minutes}`;

function newWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#icon"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// celsiusTemperature = response.data.main.temp;

function search(city) {
  let apiKey = "8de0142a1472dd581bd2689be42668ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newWeather);
}

function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "8de0142a1472dd581bd2689be42668ec";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 66;
// }
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", changeToFahrenheit);

// function changeToCelcius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 19;
// }
// let celciusLink = document.querySelector("#celsius-link");
// celciusLink.addEventListener("click", changeToCelcius);

search("London");
