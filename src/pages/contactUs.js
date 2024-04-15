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
