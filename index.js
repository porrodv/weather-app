const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchInput = document.querySelector("#searchInput");
let target = 0;

searchInput.addEventListener("focus", () => (target = 1));
searchInput.addEventListener("blur", () => (target = 0));

document.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && target == 1) showInfo();
});
searchBtn.addEventListener("click", () => showInfo());

function showInfo() {
  const APIKey = "ca9fa67bb6e7cc9825ea7b766e221c9f";
  const city = document.querySelector(".search input").value;
  const weatherBox = document.querySelector(".weather-box");
  const error404 = document.querySelector(".error-404");

  if (city === "") {
    weatherBox.style.display = "none";
    error404.style.display = "none";
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        const image404 = document.querySelector(".error-404 img");
        weatherBox.style.display = "none";
        error404.style.display = "block";
        image404.src = "./img/error404.png";
        return;
      }
      error404.style.display = "none";
      searchInput.blur();

      const image = document.querySelector(".weather img");
      const city = document.querySelector(".weather .city");
      const temperature = document.querySelector(".weather .temperature");
      const description = document.querySelector(".weather .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      const clouds = document.querySelector(".weather-details .clouds span");

      weatherBox.style.display = "block";
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} <h5>Km/h</h5>`;
      clouds.innerHTML = `${data.clouds.all}%`;

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "./img/clear.png";
          break;

        case "Rain":
          image.src = "./img/rain.png";
          break;

        case "Snow":
          image.src = "./img/snow.png";
          break;

        case "Clouds":
          image.src = "./img/clouds.png";
          break;

        case "Haze":
          image.src = "./img/haze.png";
          break;

        default:
          image.src = "./img/extra.png";
      }
    });
}
