
import React from 'react';
import "./Cardformat.css"

function Cardformat(props) {
  return (
    <div className="countryCard">
        <img src={props.flag} alt={`${props.name}'s Flag`} />
        <h2>{props.name}</h2>
    </div>
  )
}

export default Cardformat;