const apiKey = "c88c5cf76b17a014343062620809c1f3";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${Math.round(data.main.humidity)}%`,
      `Wind speed: ${Math.round(data.wind.speed)} m/s`,
    ];

    weatherData.querySelector(".icon").innerHTML = `<img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="Weather Icon"
          />`;

    weatherData.querySelector(".temperature").textContent = `${temp}°C`;
    weatherData.querySelector(".description").textContent = desc;
    const deats = weatherData.querySelector(".details");
    deats.innerHTML = "";
    details.forEach((detail) => {
      const d = document.createElement("div");
      d.textContent = detail;
      deats.appendChild(d);
    });
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";

    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "Error happened Please Try again Later";
    const deats = weatherData.querySelector(".details");
    deats.innerHTML = "";
  }
}
