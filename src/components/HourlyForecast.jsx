import React, { useState, useMemo } from "react";
import "./HourlyForecast.css";
import HourlyInfoCard from "./HourlyInfoCard.jsx";
import { formatToDayAndDate } from "../services/formatDay&Date.js";

// Function to group hourly data by day
function groupByDay(hoursData) {
  return hoursData.reduce((acc, item) => {
    const date = item.time.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
}

const HourlyForecast = ({ weatherData }) => {
  const emptyHours = Array(24).fill(null);

  // Show loading state if weatherData is not available
  if (!weatherData) {
    return (
      <div>
        <div className="hourly-forecast-header">
          <h3>Hourly forecast</h3>
        <select
          className="day-filter"
          value="-"
        >-</select>
        </div>
        <div className="loading-hourly-forecast">
          {emptyHours.map((_, index) => (
            <HourlyInfoCard key={index} label="" icon="" temp="" />
          ))}
        </div>
      </div>
    );
  }

  const { hourly, hourly_units } = weatherData;
  const hoursData = hourly.time.map((t, i) => ({
    time: t,
    weather_code: hourly.weather_code[i],
    temperature_2m: Math.round(hourly.temperature_2m[i]),
  }));

  const grouped = useMemo(() => groupByDay(hoursData), [hoursData]);
  const dayKeys = Object.keys(grouped);

  const [selectedDay, setSelectedDay] = useState(dayKeys[0]);
  const visibleHours = grouped[selectedDay];

  return (
    <div>
      <div className="hourly-forecast-header">
        <h3>Hourly forecast</h3>
        <select
          className="day-filter"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {dayKeys.map((d) => (
            <option key={d} value={d}>
              {formatToDayAndDate(d).day}
            </option>
          ))}
        </select>
                  
      </div>

      {/* Hourly Cards */}
      <div className="hourly-forecast-container">
        {visibleHours.map((data, index) => (
          <HourlyInfoCard
            key={index}
            label={formatToDayAndDate(data.time).time}
            icon={data.weather_code}
            temp={`${data.temperature_2m} ${hourly_units.temperature_2m}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
