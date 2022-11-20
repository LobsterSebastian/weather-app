let now = new Date();
let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h3.innerHTML = `${day}, ${hours}:${minutes}`;

// format city

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity();
}

let searchForm = document.querySelector("#form-city");
searchForm.addEventListener("submit", search);

//find city+temp
function searchCity() {
  let apiKey = "e69b86c47fd0362c73b7773c14be72cc";
  let units = "metric";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temp;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let speed = Math.round(response.data.wind.speed);
  let currentWindSped = document.querySelector("#windSpeed");
  currentWindSped.innerHTML = `Windspeed: ${speed}mph`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e69b86c47fd0362c73b7773c14be72cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function currentCityWeather() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentCityWeather);
