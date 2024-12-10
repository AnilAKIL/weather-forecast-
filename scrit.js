// Define constants
const apiKey = '68d4c40430408dc42259e76550bfeb98'; // Replace with your OpenWeather API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-box input"); // Input element
const searchBtn = document.querySelector(".search-box button"); // Button element
const weatherIcon = document.querySelector(".weather img"); // Icon element

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data);

    // Display weather data
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".info-humidity span").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".info-wind span").innerHTML = `${data.wind.speed} km/h`;

    // Display the appropriate weather icon
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "cloud.gif"; // Matches your cloud.png in the HTML
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "sunshine.gif";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "rain.gif";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "snowing.gif";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "mist.png";
    }

    // Ensure error message and "Not Found" are hidden
    document.getElementById("error-message").classList.add("hidden");
    document.querySelector(".not-found").classList.add("hidden");

    // Display the weather information
    document.querySelector(".weather-box").style.display = "block";
    document.querySelector(".not-found").style.display = "block";
    document.querySelector(".weather-details").style.display = "flex";

  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("error-message").classList.remove("hidden");
    document.querySelector(".weather-box").style.display = "none";
    document.querySelector(".weather-details").style.display = "none";
  }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
