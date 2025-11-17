import React, { useState, useRef, useEffect } from 'react';
import "./SearchBar.css";

const SearchBar = ({ placeHolder, icon, alt, onTyping, suggestions = [], onSelect }) => {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    setShowDropdown(true);
    setSelectedIndex(-1);
    
    if (onTyping) {
      onTyping(e.target.value);
    }
  };

  // Handle selection of a city
  const handleSelect = (city) => {
    const cityName = `${city.name}, ${city.country}`;
    setValue(cityName);
    setShowDropdown(false);
    
    if (onSelect) {
      onSelect(city);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || !suggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
      
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show dropdown when suggestions change
  useEffect(() => {
    if (suggestions && suggestions.length > 0 && value) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [suggestions, value]);

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-container">
        <img className="searchbar-icon" src={icon} alt={alt} />
        <input 
          ref={inputRef}
          className="searchbar-input" 
          type="text" 
          name="location-search"
          id="location-search-input"
          placeholder={placeHolder} 
          value={value} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          data-form-type="other"
          data-lpignore="true"
          aria-label="Search for a location"
          aria-autocomplete="list"
          aria-controls="suggestions-dropdown"
          aria-expanded={showDropdown}
        />
      </div>

      {/* Dropdown Suggestions */}
      {showDropdown && suggestions && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          id="suggestions-dropdown"
          className="suggestions-dropdown"
          role="listbox"
        >
          {suggestions.map((city, index) => (
            <div
              key={`${city.id}-${index}`}
              className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <div className="suggestion-main">
                <span className="city-name">{city.name}, {city.admin1}, {city.country}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && value && suggestions && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-results">
            No locations found for "{value}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;