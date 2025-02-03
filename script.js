const cityInput = document.querySelector('.city-search');
const searchBtn = document.querySelector('.search-btn');
const unitToggle = document.getElementById('unitToggle');
const unitLabel = document.querySelector('.unit-label');

const weatherInfoSection = document.querySelector('.weather-info');
const landingSection = document.querySelector('.search-city-landing');
const notFoundSection = document.querySelector('.search-city-error');

const cityText = document.querySelector('.city');
const countryText = document.querySelector('.country');
const temperatureText = document.querySelector('.temp-txt');
const feelsLike = document.querySelector('.feels-like');
const weatherText = document.querySelector('.weather-txt');
const conditionHumidityText = document.querySelector('.condition-humidity-value');
const conditionPressureText = document.querySelector('.condition--pressure-value');
const conditionWindText = document.querySelector('.condition-wind-value');
const weatherSummaryImage = document.querySelector('.weather-image');
const dayandDateText = document.querySelector('.current-date');
const forecastItemsContainer = document.querySelector('.forecast-item-container');

const apiKey = '5acb0cb97c6f69a0f3fea2d78f161db8';
let isCelsius = true;  // Default unit

// Event listener for search button
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = ''; 
        cityInput.blur();
    }
});

// Event listener for "Enter" key
cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = ''; 
        cityInput.blur();
    }
});

// Toggle unit between Celsius and Fahrenheit
unitToggle.addEventListener('change', () => {
    isCelsius = !isCelsius;
    unitLabel.textContent = isCelsius ? "°C" : "°F";

    if (cityText.textContent.trim() !== ",") {
        updateWeatherInfo(cityText.textContent.replace(",", "").trim());
    }
});

// Function to fetch data using Axios
async function getFetchData(endpoint, city) {
    const unit = isCelsius ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Function to update weather information
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    if (!weatherData || weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const {
        name,
        main: { temp, humidity, pressure, feels_like },
        weather: [{ id, main }],
        wind: { speed },
        sys: { country }
    } = weatherData;

    cityText.textContent = ',' + name;
    countryText.textContent = country;
    temperatureText.textContent = Math.round(temp) + (isCelsius ? ' °C' : ' °F');
    feelsLike.textContent = Math.round(feels_like) + (isCelsius ? ' °C' : ' °F');
    weatherText.textContent = main;
    conditionHumidityText.textContent = humidity + ' %';
    conditionPressureText.textContent = pressure + ' hPa';
    conditionWindText.textContent = speed + (isCelsius ? ' m/s' : ' mph');
    weatherSummaryImage.src = `assets/weather/${getWeatherIcon(id)}`;
    dayandDateText.textContent = getCurrentDate();

    await updateForecastInfo(city);
    showDisplaySection(weatherInfoSection);
}

// Function to update 5-day forecast
async function updateForecastInfo(city) {
    const forecastData = await getFetchData('forecast', city);
    if (!forecastData) return;

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    forecastItemsContainer.innerHTML = '';

    forecastData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather);
        }
    });
}

// Function to update individual forecast items
function updateForecastItems(weatherData) {
    const { dt_txt: date, main: { temp }, weather: [{ id }] } = weatherData;

    const dateTaken = new Date(date);
    const dateOption = { day: '2-digit', month: 'short' };
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption);

    const forecastItem = `
        <div class="forecast-items">
            <h5 class="forecast-item-date">${dateResult}</h5>
            <img src="./assets/weather/${getWeatherIcon(id)}" alt="" class="forecast-img">
            <h5 class="forecast-item-temp">${Math.round(temp) + (isCelsius ? ' °C' : ' °F')}</h5>
        </div>`;

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

// Function to show correct display section
function showDisplaySection(section) {
    [weatherInfoSection, landingSection, notFoundSection].forEach(sec => sec.style.display = 'none');
    section.style.display = 'flex';
    unitToggleContainer.style.display = section === landingSection ? 'none' : 'flex';
}

// Function to get weather icon
function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.png';
    if (id <= 321) return 'drizzle.png';
    if (id <= 531) return 'rain.png';
    if (id <= 622) return 'snowy.png';
    if (id <= 781) return 'haze.png';
    if (id === 800) return 'clear-sky.png';
    return 'cloudy-day.png';
}

// Function to get formatted date
function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    return currentDate.toLocaleDateString('en-US', options);
}
