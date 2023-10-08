function displayTemperature(response) {
  console.log(response.data.temperature.current);
  console.log(response.data.city);
  console.log(response.data.condition);
  console.log(response.data.temperature.humidity);
  console.log(response.data.wind.speed);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = response.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = response.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "5t5a295fb1483fe5b29973001ac3oefd";
let query = "New York";
let unit = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=${unit}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
