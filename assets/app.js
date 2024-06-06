import {Config} from "./config.js";

function getWeather() {
  let city = document.getElementById("city").value;
  if (!city) {
    city = "London";
  }
  const apiKey = Config.apiKey;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      console.log(data);

      const weatherIcon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

      const weatherInfo = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <img src="${iconUrl}" alt="${
        data.weather[0].main
      }" class="weather-icon">
                      <div class="data-order">
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Feels Like: ${data.main.feels_like}°C</p>
                        <p>Min Temperature: ${data.main.temp_min}°C</p>
                        <p>Max Temperature: ${data.main.temp_max}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        <p>Cloudiness: ${data.clouds.all}%</p>
                        <p>Sunrise: ${new Date(
                          data.sys.sunrise * 1000
                        ).toLocaleTimeString()}</p>
                        <p>Sunset: ${new Date(
                          data.sys.sunset * 1000
                        ).toLocaleTimeString()}</p>
                      </div>`;
      document.getElementById("weather").innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById(
        "weather"
      ).innerText = `Error fetching data: ${error.message}`;
    });
}
window.getWeather = getWeather;
window.onload = () => getWeather();
