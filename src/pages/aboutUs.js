import React from 'react';

const AboutUs = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{width: '45%', border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)'}}>
        <h2>Ahmed Shaikh</h2>
        <p>Second year BSD Student. Aspiring to be a Software Engineer!</p>
        
      </div>
      <div style={{width: '45%', border: '1px solid #ccc', padding: '20px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)'}}>
        <h2>John Mubeezi</h2>
        <p>Second year BSD Student. Aspiring to be a Software Engineer!</p>
       
      </div>
    </div>
  );
}

export default AboutUs;
