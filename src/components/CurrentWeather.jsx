import React from 'react';
import './CurrentWeather.css';
import sunnyIcon from '../assets/images/icon-sunny.webp';
import drizzleIcon from '../assets/images/icon-drizzle.webp';
import partlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import fogIcon from '../assets/images/icon-fog.webp';
import overcastIcon from '../assets/images/icon-overcast.webp';
import rainIcon from '../assets/images/icon-rain.webp';
import snowIcon from '../assets/images/icon-snow.webp';
import stormIcon from '../assets/images/icon-storm.webp';
import loadingIcon from '../assets/images/icon-loading.svg';  
import { formatToDayAndDate } from '../services/formatDay&Date.js';

const CurrentWeather = ({weatherData, city}) => {

  
  if (!weatherData || !city) {
    return <div className="loading-current-weather">
      <img src={loadingIcon} alt="Loading Weather" />
      <p>Loading . . .</p>
    </div>;
  }
  
  const Icons =  {
      0: sunnyIcon,          
      1: sunnyIcon,          
      2: partlyCloudyIcon,   
      3: overcastIcon,         
      45: fogIcon,
      48: fogIcon,
      51: drizzleIcon,
  }
  const weatherIcon =Icons[weatherData?.current?.weather_code] || sunnyIcon;

  console.log('CurrentWeather props:', {weatherData, city});
  const timeString = weatherData?.current?.time;
  const { day, date } = formatToDayAndDate(timeString);
  console.log(date, day);

  return (
    <div className="current-weather-card">
      <div className="city-date">
        <h2>{city.name}</h2>
        <p>{day}, {date}</p>
      </div>
      <div className="weatherIcon-temp">
        <img src={weatherIcon} alt="Today's Weather" />
        <h1>{weatherData.current.temperature_2m}{weatherData.current_units.apparent_temperature}</h1>
      </div>
    </div>
  )
}

export default CurrentWeather