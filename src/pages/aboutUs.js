/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
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
