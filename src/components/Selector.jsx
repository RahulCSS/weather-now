import React, { useState } from "react";
import "./Selector.css";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";

const Selector = ({
  title,
  leftIcon,
  leftAlt,
  rightIcon,
  rightAlt,
  unit,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define unit options with sub-categories
  const unitOptions = [
    {
      label: ["Metric", "Imperial"],
      subOptions: [
        {
          category: "Temperature",
          values: ["Celsius (°C)", "Fahrenheit (°F)"],
        },
        { category: "Wind Speed", values: ["km/h", "mph"] },
        {
          category: "Precipitation",
          values: ["Millimeters (mm)", "Inches (in)"],
        },
      ],
    },
  ];

  const nextUnit = unit === "Metric" ? "Imperial" : "Metric";
  const isMetricSelected = unit === "Metric";

  return (
    <div className="selector-container">
      <div className="selector-header" onClick={() => setIsOpen(!isOpen)}>
        {leftIcon && (
          <img src={leftIcon} alt={leftAlt} className="selector-left-icon" />
        )}
        <span>{title}</span>
        {rightIcon && (
          <img src={rightIcon} alt={rightAlt} className="selector-right-icon" />
        )}
      </div>

      
      {isOpen && unitOptions.length > 0 && (
        <ul className="selector-dropdown">
          {unitOptions.map((option, idx) => (
            <li key={idx} className="selector-option">
              <p
                className="option-label"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(nextUnit);
                }}
              >
                Switch to {unit === "Metric" ? "Imperial" : "Metric"}
              </p>

              {option.subOptions.map((sub, subIdx) => {
                const selectedValue = isMetricSelected
                  ? sub.values[0]
                  : sub.values[1];

                return (
                  <li key={subIdx} className="sub-category">
                    <span className="sub-category-title">{sub.category}</span>

                    <ul>
                      {sub.values.map((v, vIdx) => (
                        <li
                          key={vIdx}
                          className={`unit-item ${
                            v === selectedValue ? "unit-selected" : ""
                          }`}
                        >
                          <span>{v}</span>

                          {v === selectedValue && (
                            <img
                              src={checkmarkIcon}
                              alt="Selected"
                              className="checkmark"
                            />
                          )}
                        </li>
                      ))}
                    </ul>

                    {subIdx < option.subOptions.length - 1 && (
                      <hr className="option-separator" />
                    )}
                  </li>
                );
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;
