function renderHourlyForecast(hourlyData) {
  const hourlyForecastContainer = document.createElement('div');
  hourlyForecastContainer.setAttribute('id', 'hourly_forecast_container');
  document.getElementById('content').appendChild(hourlyForecastContainer);

  populateHourlyForecastContainer(hourlyData, hourlyForecastContainer);

  console.log(hourlyData);
}

// both variables are in seconds
function unixTimeToHours(unixTime, timezoneOffset) {
  return (((unixTime + timezoneOffset) / 3600) % 24);
}

function populateHourlyForecastContainer(hourlyData, container) {
  for (let i = 0; i < 25; i += 1) {
    const hourlyForecast = document.createElement('div');
    hourlyForecast.setAttribute('class', 'hourly_forecast');
    container.appendChild(hourlyForecast);

    const hour = document.createElement('div');
    hour.innerHTML = unixTimeToHours(hourlyData[i].time, hourlyData.timezone_offset);
    hour.setAttribute('class', 'hour');
    hourlyForecast.appendChild(hour);

    if (hourlyData[i].precipitation_prob > 0) {
      const probOfRain = document.createElement('div');
      probOfRain.innerHTML = (hourlyData[i].precipitation_prob * 100) + '%';
      probOfRain.setAttribute('class', 'prob_of_rain');
      hourlyForecast.appendChild(probOfRain);
    }
    const hourlyIcon = document.createElement('img');
    hourlyIcon.src = 'http://openweathermap.org/img/wn/' + hourlyData[i].icon +'@2x.png'
    hourlyIcon.setAttribute('class', 'hourly_icon');
    hourlyForecast.appendChild(hourlyIcon);

    const hourlyTemp = document.createElement('div');
    hourlyTemp.innerHTML = hourlyData[i].temp;
    hourlyTemp.setAttribute('class', 'hourly_temp');
    hourlyForecast.appendChild(hourlyTemp);
  }
}

export default renderHourlyForecast;