// PhoneNumberLogin.js
import React, { useState } from 'react';
import './PhoneNumberLogin.css';

const PhoneNumberLogin = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [qrNumber, setQrNumber] = useState('');

  const handleChange = async () => {
    try {
      const response = await fetch('http://localhost:3001/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber, email, qrNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);  // Access the 'message' property
      window.location.href = `./getUserData/${qrNumber}`;


      // Reset the form after handling the data (optional)
      setName('');
      setPhoneNumber('');
      setEmail('');
      setQrNumber('');

    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <div className="ph_no">
      <h1>Registration</h1>
      <form>
        <label htmlFor="name_reg">Name:</label>
        <input
          type="text"
          id="name_reg"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <label htmlFor="phone_number_reg">Phone Number:</label>
        <input
          type="tel"
          id="phone_number_reg"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        /><br />

        <label htmlFor="email_reg">Email:</label>
        <input
          type="email"
          id="email_reg"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />


        <label htmlFor="qr_number_reg">QR Number:</label>
        <input
          type="number"
          id="qr_number_reg"
          name="qr_number"
          value={qrNumber}
          onChange={(e) => setQrNumber(e.target.value)}
          required
        /><br />

        <button type="button" onClick={handleChange}>
          Submit
        </button>
      </form>
      <p>Already Registered? <a href="./login">Login</a></p>
    </div>
  );
};

export default PhoneNumberLogin;

