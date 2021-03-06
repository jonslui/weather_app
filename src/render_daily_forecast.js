// This function is exported to index.js where it's called to populate the day container.
// It recieves an object containing an array of 7 days and the timezone offset.
function renderDailyForecast(dailyData) {
  const dailyForecastContainer = document.createElement('div');
  dailyForecastContainer.setAttribute('id', 'daily_forecast_container');
  document.getElementById('content').appendChild(dailyForecastContainer);
  populateDailyForecastContainer(dailyData, dailyForecastContainer);
}

function populateDailyForecastContainer(dailyData, container) {
  for (let i = 1; i < 8; i += 1) {
    const dayContainer = document.createElement('div');
    dayContainer.setAttribute('class', 'day_container');
    container.appendChild(dayContainer);

    const dayName = document.createElement('div');
    dayName.setAttribute('class', 'day_name');
    dayName.innerHTML = unixTimeToWeekday(dailyData[i].time, dailyData.timezone_offset);
    dayContainer.appendChild(dayName);

    const dailyWeatherIcon = document.createElement('img');
    dailyWeatherIcon.src = 'http://openweathermap.org/img/wn/' + dailyData[i].icon +'@2x.png'
    dailyWeatherIcon.setAttribute('class', 'daily_weather_icon');
    dayContainer.appendChild(dailyWeatherIcon);

    const maxTemp = document.createElement('div');
    maxTemp.setAttribute('class', 'max_temp');
    maxTemp.innerHTML = 'H: ' + dailyData[i].high +'°';
    dayContainer.appendChild(maxTemp);

    const minTemp = document.createElement('div');
    minTemp.setAttribute('class', 'min_temp');
    minTemp.innerHTML = 'L: ' + dailyData[i].low + '°';
    dayContainer.appendChild(minTemp);

    if (dailyData[i].chance_of_rain > 0) {
      const precipitationProb = document.createElement('div');
      precipitationProb.setAttribute('class', 'daily_precip_prob');
      precipitationProb.innerHTML = (Math.round(dailyData[i].chance_of_rain * 100)) + '%';
      dayContainer.appendChild(precipitationProb);
    }
  }
}

// converts from UNIX time to the corresponding day of the week using the locations timezone offset
function unixTimeToWeekday(unixTime, timezoneOffset) {
  return new Date((unixTime * 1000) + (timezoneOffset * 1000)).toLocaleString('en-US', {
    weekday: 'long',
  });
}

export default renderDailyForecast;
