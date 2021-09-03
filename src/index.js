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
  fahrenheit.addEventListener('click', (() => {
    setLocalStorageTempScale('F');
    clearNodes();
    startPageLoad(kToF);
  }));

  const celsius = document.createElement('button');
  celsius.setAttribute('id', 'celsius');
  celsius.innerHTML = 'C';
  celsius.addEventListener('click', (() => {
    setLocalStorageTempScale('C');
    clearNodes();
    startPageLoad(kToC);
  }));

  topBar.appendChild(celsius);
  topBar.appendChild(fahrenheit);
  topBar.appendChild(submitButton);
  topBar.appendChild(locationInput);
}

function checkLocalStorage() {
  const location = localStorage.getItem('location');
  const tempScale = localStorage.getItem('scale');

  if (tempScale == null) {
    setLocalStorageTempScale('F');
  }

  if (location != null) {
    document.getElementById('location_input').value = location;
    return tempScale === 'F' ? startPageLoad(kToF) : startPageLoad(kToC);
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
