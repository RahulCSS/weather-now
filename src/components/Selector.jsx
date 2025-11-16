import React from 'react';
import "./Selector.css";

const Selector = ({title,leftIcon,leftAlt,rightIcon,rightAlt}) => {
  return (
    <div className="selector-container">
      {leftIcon && <img src={leftIcon} alt={leftAlt} />}
      <div>{title}</div>
      {rightIcon && <img src={rightIcon} alt={rightAlt} />}
    </div>
  )
}

export default Selector