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
      const response = await fetch('https://event-server2.onrender.com/saveData', {
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
      window.location.href = "./scanQR";


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
        <div className='padding'>
          <label htmlFor="name_reg"><center>Name:</center></label>
        <input
          type="text"
          id="name_reg"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /></div>
<div className='padding'>
        <label htmlFor="phone_number_reg"><center>Phone Number:</center></label>
        <input
          type="tel"
          id="phone_number_reg"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        /><br /></div>
<div className='padding'>
        <label htmlFor="email_reg"><center>Email:</center></label>
        <input
          type="email"
          id="email_reg"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /></div>

<div className='padding'>
  <label htmlFor="qr_number_reg"><center>QR Number:</center></label>
  <input
    type="number"
    id="qr_number_reg"
    name="qr_number"
    value={qrNumber}
    onChange={(e) => setQrNumber(e.target.value)}
    required
    className="decrease-size" // Add this class to the input field
  />
</div>

<div className='padding'>
<button type="button" onClick={handleChange}>
          Submit
        </button>
</div>

      </form>
<p>
  Already Registered?{' '}
  <a
    href="./login"
    style={{
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s ease, font-weight 0.3s ease',
      fontWeight: 900,
    }}
    onMouseEnter={(e) => e.target.style.color = 'blue'}
    onMouseLeave={(e) => {
      e.target.style.color = 'white';
      e.target.style.fontWeight = 'normal';
    }}
  >
    Login
  </a>
</p>


    </div>
  );
};

export default PhoneNumberLogin;

