function renderTodaysForecast(todaysData) {
  const currentForecastContainer = document.createElement('div');
  currentForecastContainer.setAttribute('id', 'current_forecast_container');
  document.getElementById('content').appendChild(currentForecastContainer);

  const currentTemperatureContainer = document.createElement('div');
  currentTemperatureContainer.setAttribute('id', 'current_temperature_container');
  currentForecastContainer.appendChild(currentTemperatureContainer);

  const weatherIcon = document.createElement('img');
  weatherIcon.src = 'http://openweathermap.org/img/wn/' + todaysData.icon +'@2x.png';
  weatherIcon.setAttribute('id', 'weather_icon');
  currentForecastContainer.appendChild(weatherIcon);

  // clean up add labels
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

  const highLowContainer = document.createElement('div');
  highLowContainer.setAttribute('id', 'high_low_container');
  currentForecastContainer.appendChild(highLowContainer);

  const high = document.createElement('div');
  high.setAttribute('id', 'todays_high');
  high.innerHTML = 'H: ' + todaysData.todays_high + '°';
  currentTemperatureContainer.appendChild(high);

  const low = document.createElement('div');
  low.setAttribute('id', 'todays_low');
  low.innerHTML = 'L: ' + todaysData.todays_low + '°';
  currentTemperatureContainer.appendChild(low);
}

export default renderTodaysForecast;
