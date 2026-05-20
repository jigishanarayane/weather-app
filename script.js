const apiKey = "42c678b8240f1357d274795fdf4fbb4d";

let searchBtn = document.getElementById("search-btn");
let cityInput = document.getElementById("city-input");
let weatherCard = document.getElementById("weather-card");
let errorMessage = document.getElementById("error-message");

// SEARCH ON BUTTON CLICK
searchBtn.addEventListener("click", function() {
  let city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// SEARCH ON ENTER KEY
cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    let city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});

// FETCH WEATHER DATA
async function getWeather(city) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === 200) {
      showWeather(data);
    } else {
      showError();
    }
  } catch (error) {
    showError();
  }
}

// SHOW WEATHER
function showWeather(data) {
  errorMessage.classList.add("hidden");
  weatherCard.classList.remove("hidden");

  document.getElementById("city-name").textContent = data.name;
  document.getElementById("country").textContent = data.sys.country;
  document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = Math.round(data.wind.speed * 3.6) + " km/h";
  document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";
  document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
}

// SHOW ERROR
function showError() {
  weatherCard.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}