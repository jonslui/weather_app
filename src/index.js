import getWeatherData from './get_weather_data';

const contentContainer = document.getElementById('content');

const enterLocation = document.createElement('input');
contentContainer.appendChild(enterLocation);

const submitButton = document.createElement('button');
submitButton.innerHTML = 'Submit';
submitButton.addEventListener('click', () => {
  getWeatherData(enterLocation.value);
});
contentContainer.appendChild(submitButton);
