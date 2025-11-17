import React from "react";
import "./HourlyInfoCard.css";
import sunnyIcon from '../assets/images/icon-sunny.webp';
import drizzleIcon from '../assets/images/icon-drizzle.webp';
import partlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import fogIcon from '../assets/images/icon-fog.webp';
import overcastIcon from '../assets/images/icon-overcast.webp';
import rainIcon from '../assets/images/icon-rain.webp';
import snowIcon from '../assets/images/icon-snow.webp';
import stormIcon from '../assets/images/icon-storm.webp';

const HourlyInfoCard = ({label,icon,temp}) => {

  // Mapping weather codes to icons
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

  return (
    <div className="hourly-card">
      <div className="hourly-icon-time">
        {icon || icon === 0 ? (
          <img 
            className="hourlyinfo-icon" 
            src={weatherIcon} 
            alt="hourly-icon" 
          />
        ) : null}
        <span className="hourly-time">{label}</span>
      </div>
      <span className="hourly-temp">{temp}</span>
    </div>
  );
};

export default HourlyInfoCard;
