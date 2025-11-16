import React from 'react'

const SearchBar = ({placeHolder,icon,alt}) => {
  return (
    <div>
      <img src={icon} alt={alt} />
      <input type="text" placeholder={placeHolder} />
    </div>
  )
}

export default SearchBar