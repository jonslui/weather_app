// pull todays, hourly, and daily data + return an object with corresponding weather data
async function getWeatherData(city, convert, key) {
  try {
    const geocodeResponse = await fetch(
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
      'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat
      + '&lon=' + lon
      + '&exclude=minutely'
      + '&appid=' + key,
      { mode: 'cors' },
    );
    const data = await response.json();

    const weatherData = {
      location: address,
      current: createTodayObject(data, convert),
      daily: createDailyObject(data, convert),
      hourly: createHourlyObject(data, convert),
    };

    return weatherData;
  } catch (err) {
    alert('Check your spelling!');
  }
}

// creates an object with todays data from the API calls
function createTodayObject(data, convert) {
  const todaysData = {
    temp: convert(data.current.temp),
    feels_like: convert(data.current.feels_like),
    humidity: data.current.humidity,
    high: convert(data.daily[0].temp.max),
    low: convert(data.daily[0].temp.min),
    icon: data.current.weather[0].icon,
  };

  return todaysData;
}

// creates an object with daily data from the API calls
function createDailyObject(data, convert) {
  const dailyData = {
    timezone_offset: data.timezone_offset,
  };

  for (let i = 0; i < data.daily.length; i += 1) {
    dailyData[i] = {
      high: convert(data.daily[i].temp.max),
      low: convert(data.daily[i].temp.min),
      icon: data.daily[i].weather[0].icon,
      time: data.daily[i].dt,
      chance_of_rain: data.daily[i].pop,
    };
  }

  return dailyData;
}

// creates an object with hourly data from the API calls
function createHourlyObject(data, convert) {
  const hourlyData = {
    timezone_offset: data.timezone_offset,
  };

  for (let i = 0; i < data.hourly.length; i += 1) {
    hourlyData[i] = {
      time: data.hourly[i].dt,
      temp: convert(data.hourly[i].temp),
      icon: data.hourly[i].weather[0].icon,
      chance_of_rain: data.hourly[i].pop,
    };
  }

  return hourlyData;
}

export default getWeatherData;
