import React, { useState } from 'react';
import Card from './Card';
import './Row.css';

const Row = ({ title, cards, description }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="mb-8 h-[600px] relative bg-">
      <center>
      
        <h2 className="text-[50px] font-bold mb-4 text-center text-[#FF0033]">{title}</h2>
        <div className='h-[150px] w-[1200px] text-center bg-white text-black'>
          <p>{description}</p></div>
        
      </center>
      <br />
      <div
        className={`flex overflow-hidden w-[2500px] transition-transform ${
          'animation-running'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Row;
