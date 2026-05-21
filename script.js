const apiKey = "459e6af694a6718d682fb15cf49d56d4";

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
  // Show loading
  document.getElementById("loading").classList.remove("hidden");
  weatherCard.classList.add("hidden");
  errorMessage.classList.add("hidden");

  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  try {
    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("loading").classList.add("hidden");

    if (data.cod === 200) {
      showWeather(data);
      saveRecentCity(city);
    } else {
      showError();
    }
  } catch (error) {
    document.getElementById("loading").classList.add("hidden");
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

  // Change background based on weather
  let condition = data.weather[0].main.toLowerCase();
  if (condition.includes("rain") || condition.includes("drizzle")) {
    document.body.style.background = "linear-gradient(135deg, #1a1a2e, #16213e, #0a3d62)";
  } else if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(135deg, #2c3e50, #3d5166, #4a6741)";
  } else if (condition.includes("clear")) {
    document.body.style.background = "linear-gradient(135deg, #f46b45, #eea849, #f7971e)";
  } else if (condition.includes("snow")) {
    document.body.style.background = "linear-gradient(135deg, #e0eafc, #cfdef3, #a8c0ff)";
  } else {
    document.body.style.background = "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)";
  }
}

// SHOW ERROR
function showError() {
  weatherCard.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

// RECENT SEARCHES
let recentCities = [];

function saveRecentCity(city) {
  if (!recentCities.includes(city)) {
    recentCities.unshift(city);
    if (recentCities.length > 5) recentCities.pop();
    showRecentCities();
  }
}

function showRecentCities() {
  let existing = document.getElementById("recent-searches");
  if (existing) existing.remove();

  let div = document.createElement("div");
  div.id = "recent-searches";
  div.innerHTML = "<p class='recent-title'>Recent Searches</p>";

  recentCities.forEach(function(city) {
    let btn = document.createElement("button");
    btn.textContent = city;
    btn.classList.add("recent-btn");
    btn.addEventListener("click", function() {
      cityInput.value = city;
      getWeather(city);
    });
    div.appendChild(btn);
  });

  document.querySelector(".container").appendChild(div);
}
