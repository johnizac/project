/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import React from 'react';

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <p>Phone number: <a href="tel:77788881111">777 8888 1111</a></p>
      <p>Email: <a href="mailto:contactus@example.com">Contactus@example.com</a></p>
      <p>Working Hours:</p>
      <ul>
        <li>Mon-Friday 8 AM - 7 PM</li>
        <li>Sat/Sun - 12pm - 5pm</li>
      </ul>
    </div>
  );
};

export default ContactDetails;
