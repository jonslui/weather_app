import getWeatherData from './get_weather_data';
import renderTodaysForecast from './render_todays_forecast';
import renderHourlyForecast from './render_hourly_forecast';

async function startPageLoad() {
  try {
    const input = document.getElementById('location_input');
    const weatherData = await getWeatherData(input.value);

    // update currently displayed address
    input.value = weatherData.location;

    renderTodaysForecast(weatherData.current);
    renderHourlyForecast(weatherData.hourly);
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

function createTopBar() {
  const contentContainer = document.getElementById('content');

  const topBar = document.createElement('div');
  topBar.setAttribute('id', 'top_bar');
  contentContainer.appendChild(topBar);

  const locationInput = document.createElement('input');
  locationInput.setAttribute('id', 'location_input');
  topBar.appendChild(locationInput);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit_button');
  submitButton.innerHTML = 'Submit';
  submitButton.addEventListener('click', () => {
    clearNodes();
    startPageLoad();
  });
  topBar.appendChild(submitButton);
}

// Driver
createTopBar();

// Create a function that clears all previous data after topbar child?
