async function getWeatherInfo(location) {
  try {
    // Add API here to geocode

    const response = await fetch(
      // eslint-disable-next-line prefer-template
      'https://api.openweathermap.org/data/2.5/onecall?lat=' + 33.44
      + '&lon=' + -94.04
      + '&exclude=minutely'
      + '&appid=f28c637b536fd0079c1b9e884e3468f3',
      { mode: 'cors' },
    );
    const data = await response.json();

    // pull needed data from JSON
    const neededData = {
      temp_now_real: data.current.temp,
      temp_now_feel: data.current.feels_like,
      temp_now_humidity: data.current.humidity,
      todays_high: data.daily[0].temp.max,
      todays_low: data.daily[0].temp.min,
    };

    console.log(neededData);
  } catch (err) {
    console.log(err);
  }
}

getWeatherInfo('London');
