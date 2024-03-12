// PhoneNumberLogin.js
import React, { useState } from 'react';
import './BoothReg.css';

const BoothReg = () => {
  const [boothName, setBoothName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [boothNumber, setBoothNumber] = useState('');

  const handleChange = async () => {
    try {
      const response = await fetch('https://event-server2.onrender.com/saveBoothData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boothName, phoneNumber, email, boothNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);  // Access the 'message' property
      window.location.href = "./scanBoothQR";


      // Reset the form after handling the data (optional)
      setBoothName('');
      setPhoneNumber('');
      setEmail('');
      setBoothNumber('');

    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <div className="ph_no">
      <h1>Booth Registration</h1>
      <form>
      <div className='padding'>
        <label htmlFor="booth_name_reg"><center>Booth Name:</center></label>
        <input
          type="text"
          id="booth_name_reg"
          name="booth_name"
          value={boothName}
          onChange={(e) => setBoothName(e.target.value)}
          required
        /><br />
        </div>

        <div className='padding'>
        <label htmlFor="phone_number_reg"><center>Phone Number:</center></label>
        <input
          type="tel"
          id="phone_number_reg"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        /><br />
        </div>

        <div className='padding'>
        <label htmlFor="email_reg"><center>Email:</center></label>
        <input
          type="email"
          id="email_reg"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        </div>

        <div className='padding'>
        <label htmlFor="booth_number_reg"><center>Booth Number:</center></label>
        <input
          type="number"
          id="booth_number_reg"
          name="booth_number"
          value={boothNumber}
          onChange={(e) => setBoothNumber(e.target.value)}
          required
          className="decrease-size" // Add this class to the input field
        /><br />
        </div>

        <button type="button" onClick={handleChange}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BoothReg;

