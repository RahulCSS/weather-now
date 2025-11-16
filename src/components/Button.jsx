import React from 'react'
import "./Button.css"

const Button = ({title}) => {
  return (
    <div className="button-container">{title}</div>
  )
}

export default Button