// Card.js

import React from 'react';
import './Card.css'; // Import the CSS file with the provided styles

const Card = ({ image, title}) => {
  return (
    <div className='grid-container'>
    <div className="grid-item">
      <div className="grid-content">
        <img className="imgs" src={image} alt={title} />
        
      </div>
    </div>
    </div>
  );
};

export default Card;
