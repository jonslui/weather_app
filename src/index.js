import getWeatherData from './get_weather_data';
import renderTodaysForecast from './render_todays_forecast';
import renderHourlyForecast from './render_hourly_forecast';
import renderDailyForecast from './render_daily_forecast';

// Retrieves Data from APIs and renders their data
async function retrieveAndRenderData(convert) {
  try {
    const input = document.getElementById('location_input');
    const weatherData = await getWeatherData(input.value, convert);

    // update currently displayed address
    input.value = weatherData.location;
    setLocalStorageLocation(weatherData.location);

    renderTodaysForecast(weatherData.current);
    renderHourlyForecast(weatherData.hourly);
    renderDailyForecast(weatherData.daily);
  } catch (err) {
    console.log(err);
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
    clearNodes();
    retrieveAndRenderData(kToF);
  }));

  celsius.addEventListener('click', (() => {
    setLocalStorageTempScale('C');
    setScaleButtonColors('C', fahrenheit, celsius);
    clearNodes();
    retrieveAndRenderData(kToC);
  }));

  topBar.appendChild(celsius);
  topBar.appendChild(fahrenheit);
  topBar.appendChild(submitButton);
  topBar.appendChild(locationInput);
}

// Adjusts Temperature Metric buttons according to which is active
function setScaleButtonColors(scale, fButton, cButton) {
  if (scale === 'F') {
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
  const tempScale = localStorage.getItem('scale');

  if (tempScale == null) {
    setLocalStorageTempScale('F');
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
