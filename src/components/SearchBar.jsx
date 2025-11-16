import React from 'react'
import "./SearchBar.css"

const SearchBar = ({placeHolder,icon,alt}) => {
  return (
    <div className="searchbar-container">
      <img className="searchbar-icon" src={icon} alt={alt} />
      <input className="seachbar-input" type="text" placeholder={placeHolder} />
    </div>
  )
}

export default SearchBar