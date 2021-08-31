import getWeatherData from './get_weather_data';
import renderTodaysForecast from './render_todays_forecast';

async function startPageLoad() {
  try {
    const input = document.getElementById('location_input');
    const weatherData = await getWeatherData(input.value);

    // update currently displayed address
    input.value = weatherData.location;

    renderTodaysForecast(weatherData.current);
  } catch (err) {
    console.log(err);
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
    startPageLoad();
  });
  topBar.appendChild(submitButton);
}

// Driver
createTopBar();

// 1. Create Top Bar // Initial display
// 2. On submit button click, check returned info and make a decision on which page to display
// 2a. On successful return, render all other data.
