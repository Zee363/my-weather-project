function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed-of-wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"></img>`


  cityElement.innerHTML = response.data.city;temperature
  timeElement.innerHTML = formattedDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

acquireForecast(response.data.city);
}

function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
   
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function findCity(city) {
  let apiKey = "4b230af38fdc2b34b014a5b47d0e5tob";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  findCity(searchInput.value);
}

function formattedDay(timestamp) {
let date = new Date(timestamp * 1000);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[date.getDay()];
}

function acquireForecast(city) {
let apiKey = "4b230af38fdc2b34b014a5b47d0e5tob";
let apiUrl =
  `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=4b230af38fdc2b34b014a5b47d0e5tob&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);

let forecastElement = document.querySelector("#forecast");

let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
let forecastHtml = "";

response.data.daily.forEach(function (day, index) {
  if (index > 0 && index < 6) {
forecastHtml += `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${formattedDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"><strong>${Math.round(
          day.temperature.maximum
        )}</strong>&deg;
        </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}&deg;</span>
        </div>
        </div>
      `;
        }
});

forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

findCity("Cape Town");
showForecast();
