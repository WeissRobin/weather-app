const cityInput = document.getElementById("countries");
const suggestions = document.querySelector(".suggestions");

const welcomeUI = document.querySelector(".welcome-wrapper");
const weatherUI = document.querySelector(".weather-content-wrapper");

cityInput.addEventListener("input", () => {
  const input = cityInput.value;
  if (input == "") {
    suggestions.innerHTML = "";
    return;
  } else {
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=b301fae74e5c4e42926164325232512&q=${input}`
    )
      .then((data) => data.json())
      .then((data) => showAutocomplete(data));
  }
});

showAutocomplete = (data) => {
  suggestions.innerHTML = "";
  data.forEach((city) => {
    const { name, region } = city;
    suggestions.innerHTML += `
        <li class="city-item">${name}, ${region}</li>
        `;
  });
  const cities = document.querySelectorAll(".city-item");
  cities.forEach((city) => {
    city.addEventListener("click", (e) => {
      suggestions.innerHTML = "";
      cityInput.value = e.target.textContent;
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=b301fae74e5c4e42926164325232512&q=${cityInput.value}&days=7&aqi=no&alerts=no`
      )
        .then((data) => data.json())
        .then((data) => showUI(data));
    });
  });
};

showUI = (city) => {
  let body = document.body;
  const condition = city.current.condition.text;
  
  // Remove existing weather classes
  body.classList.remove('sunny', 'overcast', 'clear');
  
  // Apply new weather class
  switch (condition) {
    case 'Sunny':
      body.classList.add('sunny');
      break;
    case 'Overcast':
      body.classList.add('overcast');
      break;
    case 'Clear':
      body.classList.add('clear');
      break;
    default:
      // If no specific weather condition, use default styles
      break;
  }
  

  const realFeelIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 1024 1792"><path fill="#90939c" d="M640 1344q0 80-56 136t-136 56t-136-56t-56-136q0-60 35-110t93-71V768h128v395q58 21 93 71t35 110m128 0q0-77-34-144t-94-112V320q0-80-56-136t-136-56t-136 56t-56 136v768q-60 45-94 112t-34 144q0 133 93.5 226.5T448 1664t226.5-93.5T768 1344m128 0q0 185-131.5 316.5T448 1792t-316.5-131.5T0 1344q0-182 128-313V320q0-133 93.5-226.5T448 0t226.5 93.5T768 320v711q128 131 128 313m128-576v128H832V768zm0-256v128H832V512zm0-256v128H832V256z"/></svg>';
  const uvIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="#90939c" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391l-19.9 107.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391L13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256L2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.9-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1l90.3-62.3c4.5-3.1 10.2-3.7 15.2-1.6M160 256a96 96 0 1 1 192 0a96 96 0 1 1-192 0m224 0a128 128 0 1 0-256 0a128 128 0 1 0 256 0"/></svg>';
  const humidityIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><path fill="#90939c" d="M12 21.5q-3.325 0-5.663-2.3T4 13.6q0-1.575.613-3.012T6.35 8.05L12 2.5l5.65 5.55q1.125 1.1 1.738 2.538T20 13.6q0 3.3-2.337 5.6T12 21.5m-6-7.9h12q0-1.175-.45-2.237T16.25 9.5L12 5.3L7.75 9.5q-.85.8-1.3 1.863T6 13.6"/></svg>';
  const windIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#90939c" d="M10.5 4a1.5 1.5 0 0 0-1.47 1.199A1 1 0 1 1 7.07 4.8A3.5 3.5 0 1 1 10.5 9H5a1 1 0 0 1 0-2h5.5a1.5 1.5 0 0 0 0-3m8 4a1.5 1.5 0 0 0-1.47 1.199a1 1 0 1 1-1.96-.398A3.5 3.5 0 1 1 18.5 13H3a1 1 0 1 1 0-2h15.5a1.5 1.5 0 0 0 0-3m-5.47 10.801A1.5 1.5 0 1 0 14.5 17H8a1 1 0 1 1 0-2h6.5a3.5 3.5 0 1 1-3.43 4.199a1 1 0 1 1 1.96-.398"/></g></svg>';

  const weatherContent = document.querySelector(".weather-content-wrapper");
  const weatherCol1 = weatherContent.querySelector(".weather-col-1");
  const weatherCol2 = weatherContent.querySelector(".weather-col-2");
  const weatherCol3 = weatherContent.querySelector(".weather-col-3");
  const weatherCol4 = weatherContent.querySelector(".weather-col-4");

  weatherCol1.innerHTML = `
    <div class="weather-basic">
        <h2 class="weather-city-location">${city.location.name}, ${city.location.region}</h2>
        <img class="weather-image" src="${city.current.condition.icon}">
    </div>
    <span class="weather-text">${city.current.condition.text}</span>
    <span class="weather-celsius">${city.current.temp_c}°</span>
    `;
  weatherCol2.innerHTML = `
    <h3 class="weather-conditions-title">Air Conditions</h3>
    <div class="weather-conditions">
        <div class="weather-realfeel condition">
            <i class="icon">${realFeelIcon}</i>
            <div>
                <span class="condition-title">Real Feel</span>
                <span class="condition-value">${city.current.feelslike_c}°</span>
            </div>
        </div>
        <div class="weather-wind condition">
            <i class="icon">${windIcon}</i>
            <div>
                <span class="condition-title">Wind</span>
                <span class="condition-value">${city.current.wind_kph} km/h</span>
            </div>
        </div>
        <div class="weather-humidity condition">
            <i class="icon">${humidityIcon}</i>
            <div>
                <span class="condition-title">Humidity</span>
                <span class="condition-value">${city.current.humidity}%</span>
            </div>
        </div>
        <div class="weather-uv condition">
            <i class="icon">${uvIcon}</i>
            <div>
                <span class="condition-title">UV Index</span>
                <span class="condition-value">${city.current.uv}</span>
            </div>
        </div>
    </div>
    `;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  weatherCol3.innerHTML = `
    <h3 class="weather-forecast-title">3-Day Forecast</h3>
    ${city.forecast.forecastday
      .map((forecast) => {
        return `
        <div class="forecastday">
            <span class="forecast-day">${
              days[new Date(forecast.date).getDay()]
            }</span>
            <img class="forecast-image" src="${forecast.day.condition.icon}">
            <span class="forecast-condition">${
              forecast.day.condition.text
            } <p class="forecast-celsius"><span class="max-c">${
          forecast.day.maxtemp_c
        }</span><span class="min-c">/${forecast.day.mintemp_c}</span></p>
        </div>
        `;
      })
      .join("")}
    `;

  weatherCol4.innerHTML = `
    <h3 class="today-forecast-title">Today's Forecast</h3>
    <div class="today-forecast">
        ${city.forecast.forecastday[0].hour
          .filter((hour, index) => {
            return (
              index === 6 ||
              index === 9 ||
              index === 12 ||
              index === 15 ||
              index === 18 ||
              index === 21
            );
          })
          .map((hour) => {
            return `
            <div class="today-forecast-item">
                <span class="today-forecast-time">${
                  hour.time.split(" ")[1]
                }</span>
                <img class="today-forecast-image" src="${hour.condition.icon}">
                <span class="today-forecast-celsius">${hour.temp_c}°</span>
            </div>
            `;
          })
          .join("")}
    `;

  applyAnimations();
};

function applyAnimations() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 700) {
    welcomeUI.style.animation = "SHRINK_MAIN 1.2s forwards";
    weatherUI.style.animation = "EXPAND_WEATHER 1.2s forwards";
  } else {
    // Reset animation properties if the window width is less than or equal to 700px
    welcomeUI.style.animation = "none";
    weatherUI.style.animation = "none";
  }
}