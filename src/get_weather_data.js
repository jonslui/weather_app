/* eslint-disable no-console */
// pull daily data and return an object with high, low, weather, and weather description
async function getWeatherData(city) {
  try {
    const geocodeResponse = await fetch(
      // eslint-disable-next-line prefer-template
      'https://nominatim.openstreetmap.org/?addressdetails=1&q='
      + city
      + '&format=json&limit=1',
      { mode: 'cors' },
    );
    const geocodeData = await geocodeResponse.json();
    const [lat, lon, address] = [geocodeData[0].lat,
      geocodeData[0].lon,
      geocodeData[0].display_name];

    const response = await fetch(
      // eslint-disable-next-line prefer-template
      'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat
      + '&lon=' + lon
      + '&exclude=minutely'
      + '&appid=f28c637b536fd0079c1b9e884e3468f3',
      { mode: 'cors' },
    );
    const data = await response.json();

    const weatherData = {
      location: address,
      current: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        todays_high: data.daily[0].temp.max,
        todays_low: data.daily[0].temp.min,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
      },
      // eslint-disable-next-line no-use-before-define
      daily: createDailyObject(data),
      // eslint-disable-next-line no-use-before-define
      hourly: createHourlyObject(data),
    };

    return weatherData;
  } catch (err) {
    // return err;
  }
}

function createDailyObject(data) {
  const dailyData = {
    timezone_offset: data.timezone_offset,
  };

  for (let i = 0; i < data.daily.length; i += 1) {
    dailyData[i] = {
      high: data.daily[i].temp.max,
      low: data.daily[i].temp.min,
      icon: data.daily[i].weather[0].icon,
      time: data.daily[i].dt,
    };
  }

  return dailyData;
}

// pull hourly data and return object with temp and weather id
function createHourlyObject(data) {
  const hourlyData = {
    timezone_offset: data.timezone_offset,
  };

  for (let i = 0; i < data.hourly.length; i += 1) {
    hourlyData[i] = {
      time: data.hourly[i].dt,
      temp: data.hourly[i].temp,
      icon: data.hourly[i].weather[0].icon,
      precipitation_prob: data.hourly[i].pop,
    };
  }

  return hourlyData;
}

export default getWeatherData;
