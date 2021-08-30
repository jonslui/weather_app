import getWeatherData from './get_weather_data';
import renderWeatherData from './render_weather_data';

async function startPageLoad() {
  try {
    const weatherData = await getWeatherData(locationInput.value);
    renderWeatherData(weatherData);
  } catch (err) {
    console.log(err);
  }
}

// Driver
const contentContainer = document.getElementById('content');

const locationInput = document.createElement('input');
contentContainer.appendChild(locationInput);

const submitButton = document.createElement('button');
submitButton.innerHTML = 'Submit';
submitButton.addEventListener('click', () => {
  startPageLoad();
});
contentContainer.appendChild(submitButton);
