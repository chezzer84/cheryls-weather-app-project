function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function getForecast(coordinates) {
  let apiKey = "5t5a295fb1483fe5b29973001ac3oefd";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDaily(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "5t5a295fb1483fe5b29973001ac3oefd";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrentheitTemperature(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrentheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrentheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDaily, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-day">${formatDaily(forecastDaily.time)}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastDaily.condition.icon
    }.png"
    alt="" 
    width="42"
    />
    <div class="weather-forecast-temperatures">
      <span class ="weather-forecast-temperature-max">
        ${Math.round(forecastDaily.temperature.maximum)}°</span>
       <span class ="weather-forecast-temperature-min">
         ${Math.round(forecastDaily.temperature.minimum)}°</span>
    </div>
  </div>

`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Perth");
