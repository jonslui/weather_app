// This function is exported to index.js where it's called to populate todays container.
// It recieves an object containing relevant data.
// creates a flex box container that the icon is added to along with a grid container that holds
// the numerical data.
function renderTodaysForecast(todaysData) {
  const currentForecastContainer = document.createElement('div');
  currentForecastContainer.setAttribute('id', 'todays_forecast_container');
  document.getElementById('content').appendChild(currentForecastContainer);

  const currentTemperatureContainer = document.createElement('div');
  currentTemperatureContainer.setAttribute('id', 'todays_temperature_container');
  currentForecastContainer.appendChild(currentTemperatureContainer);

  const weatherIcon = document.createElement('img');
  weatherIcon.src = 'http://openweathermap.org/img/wn/' + todaysData.icon +'@2x.png';
  weatherIcon.setAttribute('id', 'todays_weather_icon');
  currentForecastContainer.appendChild(weatherIcon);

  const currentTemp = document.createElement('div');
  currentTemp.innerHTML = todaysData.temp + '°';
  currentTemp.setAttribute('id', 'current_temp');
  currentTemperatureContainer.appendChild(currentTemp);

  const feelsLike = document.createElement('div');
  feelsLike.innerHTML = 'Feels like:' + '\n' + todaysData.feels_like + '°';
  feelsLike.setAttribute('id', 'feels_like');
  currentTemperatureContainer.appendChild(feelsLike);

  const humidity = document.createElement('div');
  humidity.innerHTML = 'Humidity:' + '\n' + todaysData.humidity + '%';
  humidity.setAttribute('id', 'humidity');
  currentTemperatureContainer.appendChild(humidity);

  const high = document.createElement('div');
  high.setAttribute('id', 'todays_high');
  high.innerHTML = 'H: ' + todaysData.high + '°';
  currentTemperatureContainer.appendChild(high);

  const low = document.createElement('div');
  low.setAttribute('id', 'todays_low');
  low.innerHTML = 'L: ' + todaysData.low + '°';
  currentTemperatureContainer.appendChild(low);
}

export default renderTodaysForecast;
