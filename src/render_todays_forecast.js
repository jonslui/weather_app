function renderTodaysForecast(todaysData) {
  const currentForecastContainer = document.createElement('div');
  currentForecastContainer.setAttribute('id', 'current_forecast_container');
  currentForecastContainer.innerHTML = todaysData;
  document.getElementById('content').appendChild(currentForecastContainer);
}

export default renderTodaysForecast;
