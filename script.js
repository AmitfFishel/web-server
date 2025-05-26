const weatherIcon = document.getElementById("weather-icon");
const API_KEY = "1701be22e7184e7bb7293758251405";

//choose element by id 
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const searchBtn = document.getElementById("search-btn");

// function defult values.
function displayDefaultWeather() {
    const city = cityInput.value || "Tel Aviv";
    cityNameDisplay.textContent = "Weather in: " + city;
  
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
        weatherDescription.textContent = `Weather: ${data.current.condition.text}`;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
         // מציג את האייקון
        weatherIcon.src = "https:" + data.current.condition.icon;
        weatherIcon.alt = data.current.condition.text;

  // משנה את הרקע לפי מזג האוויר
        const condition = data.current.condition.text.toLowerCase();

        if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.style.background = "linear-gradient(to bottom, #ffe0ec, #fff5f7)";
        } else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to bottom, #d3d3d3, #f0f0f0)";
        } else if (condition.includes("rain") || condition.includes("drizzle")) {
        document.body.style.background = "linear-gradient(to bottom, #7f8c8d, #bdc3c7)";
        } else if (condition.includes("snow")) {
        document.body.style.background = "linear-gradient(to bottom, #e0f7fa, #ffffff)";
        } else {
        document.body.style.background = "linear-gradient(to bottom, #ffe4e1, #fffaf0)";
  }
})
      
      .catch(error => {
        temperature.textContent = "--";
        weatherDescription.textContent = "Weather: Error";
        humidity.textContent = "--";
        windSpeed.textContent = "--";
        alert("Oops! Couldn't find that city.");
      });
  }
// addeventlistner that when we click the defult function start.
searchBtn.addEventListener("click", displayDefaultWeather);

const cityInput = document.getElementById("city");
const cityNameDisplay = document.getElementById("city-name");