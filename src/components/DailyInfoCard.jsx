import React from 'react';
import sunnyIcon from '../assets/images/icon-sunny.webp';
import drizzleIcon from '../assets/images/icon-drizzle.webp';
import partlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import fogIcon from '../assets/images/icon-fog.webp';
import overcastIcon from '../assets/images/icon-overcast.webp';
import rainIcon from '../assets/images/icon-rain.webp';
import snowIcon from '../assets/images/icon-snow.webp';
import stormIcon from '../assets/images/icon-storm.webp';
import "./DailyInfoCard.css";

const DailyInfoCard = ({label,icon,maxTemp,minTemp}) => {

  const Icons =  {
        0: sunnyIcon,          
        1: sunnyIcon,          
        2: partlyCloudyIcon,   
        3: overcastIcon,         
        45: fogIcon,
        48: fogIcon,
        51: drizzleIcon,
    }
    const weatherIcon =Icons[icon] || sunnyIcon;
    const dayLabel = label ? label.slice(0, 3) : "";

  return (
    <div className="dailyinfo-card">
      <p className="dailyinfo-day">{dayLabel}</p>
      {icon !==null && icon !== undefined && (
        <img 
          className="dailyinfo-icon" 
          src={weatherIcon} 
          alt="weather-icon" 
        />
      )}
      <div className="dailyinfo-temp-values">
        <p>{maxTemp}</p>
        <p>{minTemp}</p>
      </div>
    </div>
  )
}

export default DailyInfoCard




