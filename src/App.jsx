import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import Selector from "./components/Selector.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DetailedWeather from "./components/DetailedWeather.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import logoIcon from "./assets/images/logo.svg";
import unitsIcon from "./assets/images/icon-units.svg";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import searchIcon from "./assets/images/icon-search.svg";
import { debounce } from "./services/debounce.js";

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("Metric");
  const [selectedDay, setSelectedDay] = useState(null);

  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchCities = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5&language=en`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setSuggestions([]);
    }
  };

  const debounceFetch = useCallback(
    debounce((value) => fetchCities(value), 500),
    []
  );

  // Handle city selection from dropdown
  const handleCitySelect = async (city, unit) => {
    setSelectedCity(city);
    const isMetric = unit === "Metric";

    // Fetch weather data for selected city
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          city.latitude
        }&longitude=${
          city.longitude
        }&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,windspeed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${
          isMetric ? "celsius" : "fahrenheit"
        }&wind_speed_unit=${isMetric ? "kmh" : "mph"}&precipitation_unit=${
          isMetric ? "mm" : "inch"
        }&timezone=auto`
      );

      const data = await res.json();
      setWeatherData(data);
      console.log("Weather data:", data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }

    setSuggestions([]);
  };

  // Handle search button click
  const handleSearch = () => {
    if (selectedCity) {
      console.log("Searching weather for:", selectedCity);
    }
  };

  const handleUnitChange = (selectedUnit) => {
    if( !weatherData) return;
    setUnit(selectedUnit);
    handleCitySelect(selectedCity, selectedUnit);
  };

  return (
    <div className="container">
      {/* 1. Header section */}
      <div className="header-section">
        <img src={logoIcon} alt="Weather Now Icon" />
        <Selector
          title="Units"
          leftIcon={unitsIcon}
          leftAlt="Units Icon"
          rightIcon={dropdownIcon}
          rightAlt="Dropdown Icon"
          unit={unit}
          onSelect={(selectedUnit) => handleUnitChange(selectedUnit)}
        />
      </div>

      {/* 2. Hero section */}
      <div className="hero-section">
        <h1>How's the sky looking today?</h1>
        <div className="searchbar-button">
          <SearchBar
            placeHolder="Search for a place..."
            icon={searchIcon}
            alt="Search Icon"
            onTyping={debounceFetch}
            suggestions={suggestions}
            onSelect={handleCitySelect}
          />
          <button id="search-button" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* 3. Weather data section */}
      <div className="weather-Data-section">
        {/* Left column section */}
        <div className="left-column-section">
          <CurrentWeather weatherData={weatherData} city={selectedCity} />
          <DetailedWeather weatherData={weatherData} />
          <div>
            <h3>Daily Forecast</h3>
            <DailyForecast weatherData={weatherData} />
          </div>
        </div>

        {/* Right column section */}
        <div className="right-column-section">
          <HourlyForecast weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default App;
