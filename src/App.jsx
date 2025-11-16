import React from "react";
import "./App.css";
import Selector from "./components/Selector.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Button from "./components/Button.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DetailedWeather from "./components/DetailedWeather.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import logoIcon from "./assets/images/logo.svg";
import unitsIcon from "./assets/images/icon-units.svg";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import searchIcon from "./assets/images/icon-search.svg";

const App = () => {
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
          />
          <Button title="Search" />
        </div>
      </div>

      {/* 3. Weather data section */}
      <div className="weather-Data-section">
        {/* Left column section */}
        <div className="left-column-section">
          <CurrentWeather />
          <DetailedWeather />
          <DailyForecast />
        </div>

        {/* Right column section */}
        <div className="right-column-section">
          <div>
            <h2>Hourly forecast</h2>
            <Selector
              title="Day"
              rightIcon={dropdownIcon}
              rightAlt="Dropdown Icon"
            />
          </div>
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
};

export default App;
