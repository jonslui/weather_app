import getWeatherData from './get_weather_data';
import renderTodaysForecast from './render_todays_forecast';
import renderHourlyForecast from './render_hourly_forecast';
import renderDailyForecast from './render_daily_forecast';

async function startPageLoad(convert) {
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

// clears all containers other than the topbar from the screen on click
function clearNodes() {
  const contentContainer = document.getElementById('content');
  while (contentContainer.childNodes.length > 1) {
    contentContainer.removeChild(contentContainer.lastChild);
  }
}

function setLocalStorageLocation(location) {
  localStorage.setItem('location', location);
}

function setLocalStorageTempScale(scale) {
  localStorage.setItem('scale', scale);
}

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
      startPageLoad(kToF);
    } else {
      startPageLoad(kToC);
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
    startPageLoad(kToF);
  }));

  celsius.addEventListener('click', (() => {
    setLocalStorageTempScale('C');
    setScaleButtonColors('C', fahrenheit, celsius);
    clearNodes();
    startPageLoad(kToC);
  }));

  topBar.appendChild(celsius);
  topBar.appendChild(fahrenheit);
  topBar.appendChild(submitButton);
  topBar.appendChild(locationInput);
}

function setScaleButtonColors(scale, fButton, cButton) {
  if (scale === 'F') {
    fButton.style.opacity = 1;
    cButton.style.opacity = 0.4;
  } else {
    cButton.style.opacity = 1;
    fButton.style.opacity = 0.4;
  }
}

function checkLocalStorage() {
  const locationInput = document.getElementById('location_input');
  const location = localStorage.getItem('location');
  const tempScale = localStorage.getItem('scale');

  if (tempScale == null) {
    setLocalStorageTempScale('F');
  }

  // should this be here?
  setScaleButtonColors(tempScale, document.getElementById('fahrenheit'), document.getElementById('celsius'));

  if (location != null) {
    locationInput.value = location;
    tempScale === 'F' ? startPageLoad(kToF) : startPageLoad(kToC);
  } else {
    locationInput.placeholder = 'Enter location here';
  }
}

function kToF(kelvin) {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
}

function kToC(kelvin) {
  return Math.round(kelvin - 273.15);
}

// Driver
createTopBar();
checkLocalStorage();
