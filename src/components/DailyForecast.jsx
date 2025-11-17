import React from "react";
import DailyInfoCard from "./DailyInfoCard";
import "./DailyForecast.css";
import { formatToDayAndDate } from '../services/formatDay&Date.js';

const DailyForecast = ({ weatherData }) => {
  const emptyDays = Array(7).fill(null);

  if (!weatherData ) {
      return <div className="loading-daily-forecast">
        {emptyDays.map((card, index) => (
        <DailyInfoCard 
          key={index}
          label=""
          icon=""
          maxTemp=""
          minTemp=""
        />
      ))}
      </div>;
    }

  const { daily, daily_units } = weatherData;
  const days = daily.time.map((t, i) => ({
    time: t,
    weather_code: daily.weather_code[i],
    temperature_2m_max: daily.temperature_2m_max[i],
    temperature_2m_min: daily.temperature_2m_min[i],
  }));

  return (
    <div className="daily-cards-container">
      {days.map((data, index) => (
        <DailyInfoCard 
          key={index}
          label={formatToDayAndDate(data.time).day}
          icon={data.weather_code}
          maxTemp={`${data.temperature_2m_max} ${daily_units.temperature_2m_max}`}
          minTemp={`${data.temperature_2m_min} ${daily_units.temperature_2m_min}`}
        />
      ))}
    </div>
  );
};

export default DailyForecast;
