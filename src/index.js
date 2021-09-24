import getWeatherData from './get_weather_data';
import renderTodaysForecast from './render_todays_forecast';
import renderHourlyForecast from './render_hourly_forecast';
import renderDailyForecast from './render_daily_forecast';
import createLoader from './create_loader';

// API key (hidden) -- stored in the dist folder under config.js
// const key = config.OpenWeatherMapApiKey;
// (made visible for hosting on github pages)
const key = 'f28c637b536fd0079c1b9e884e3468f3';

// Retrieves Data from APIs and renders their data
async function retrieveAndRenderData(convert) {
  try {
    // load animation added when async/await function is called
    const loader = createLoader();

    // get address to search
    const input = document.getElementById('location_input');

    // start async api calls and return weather data
    const weatherData = await getWeatherData(input.value, convert, key);

    // update currently displayed address
    input.value = weatherData.location;
    setLocalStorageLocation(weatherData.location);

    // render data
    renderTodaysForecast(weatherData.current);
    renderHourlyForecast(weatherData.hourly);
    renderDailyForecast(weatherData.daily);

    // removes load animation after rendering complete
    loader.remove();
  } catch (err) {
    // when an error is caught, remove the loading animation
    document.getElementsByClassName('loader')[0].remove();
  }
}

// Creates the search bar, submit button and temperature metric adjuster
function createTopBar() {
  const contentContainer = document.getElementById('content');

  const topBar = document.createElement('div');
  topBar.setAttribute('id', 'top_bar');
  contentContainer.appendChild(topBar);

  const locationInput = document.createElement('input');
  locationInput.setAttribute('id', 'location_input');

  const submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit_button');
  submitButton.innerHTML = 'Submit';
  submitButton.addEventListener('click', () => {
    clearNodes();
    if (localStorage.getItem('scale') === 'F') {
      retrieveAndRenderData(kToF);
    } else {
      retrieveAndRenderData(kToC);
    }
  });

  const fahrenheit = document.createElement('button');
  fahrenheit.setAttribute('id', 'fahrenheit');
  fahrenheit.innerHTML = 'F';

  const celsius = document.createElement('button');
  celsius.setAttribute('id', 'celsius');
  celsius.innerHTML = 'C';

  fahrenheit.addEventListener('click', (() => {
    setLocalStorageTempScale('F');
    setScaleButtonColors('F', fahrenheit, celsius);

    if (locationInput.value !== '') {
      clearNodes();
      retrieveAndRenderData(kToF);
    }
  }));

  celsius.addEventListener('click', (() => {
    setLocalStorageTempScale('C');
    setScaleButtonColors('C', fahrenheit, celsius);

    if (locationInput.value !== '') {
      clearNodes();
      retrieveAndRenderData(kToC);
    };
  }));

  topBar.appendChild(celsius);
  topBar.appendChild(fahrenheit);
  topBar.appendChild(submitButton);
  topBar.appendChild(locationInput);
}

// Adjusts Temperature Metric buttons according to which is active
function setScaleButtonColors(scale, fButton, cButton) {
  if (scale === 'F' || null) {
    fButton.style.opacity = 1;
    cButton.style.opacity = 0.4;
  } else {
    cButton.style.opacity = 1;
    fButton.style.opacity = 0.4;
  }
}

// clears all containers other than the topbar from the screen on click
function clearNodes() {
  const contentContainer = document.getElementById('content');
  while (contentContainer.childNodes.length > 1) {
    contentContainer.removeChild(contentContainer.lastChild);
  }
}

// updates localStorage Location
function setLocalStorageLocation(location) {
  localStorage.setItem('location', location);
}

// updates localStorage Temperature Metric
function setLocalStorageTempScale(scale) {
  localStorage.setItem('scale', scale);
}

// checks for a previously searched location and responds accordingly
function checkLocalStorage() {
  const locationInput = document.getElementById('location_input');
  const location = localStorage.getItem('location');
  let tempScale = localStorage.getItem('scale');

  if (tempScale == null) {
    tempScale = 'F';
    setLocalStorageTempScale(tempScale);
  }

  setScaleButtonColors(tempScale, document.getElementById('fahrenheit'), document.getElementById('celsius'));

  if (location != null) {
    locationInput.value = location;
    tempScale === 'F' ? retrieveAndRenderData(kToF) : retrieveAndRenderData(kToC);
  } else {
    locationInput.placeholder = 'Enter location here';
  }
}

// recieves a number in Kelvin and returns that number in Fahrenheit
function kToF(kelvin) {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
}

// recieves a number in Kelvin and returns that number in Celsius
function kToC(kelvin) {
  return Math.round(kelvin - 273.15);
}

// Driver
createTopBar();
checkLocalStorage();
