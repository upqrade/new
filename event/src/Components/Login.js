// login.js

import React, { useState } from 'react';

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '300px',
      margin: 'auto',
      marginTop: '50px',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: '1.5em',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '10px',
      fontSize: '1em',
    },
    input: {
      padding: '8px',
      fontSize: '1em',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px',
      fontSize: '1em',
      cursor: 'pointer',
    },
  };


const Login = () => {
  const [name, setName] = useState('');
  const [qrNumber, setQRNumber] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [presentToken, setPresentToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://event-server2.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, qrNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem('token', data.token); // Store the token in local storage
        localStorage.setItem('userEmail', data.user.email); // Store the user's email
        
        window.location.href = `./getUserData/${qrNumber}`;
        console.log(data.message);
        setLoginError(false);
      } else {
        // Login failed
        console.log(data.message);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError(true);
    }
  };

  
    return (
      <div style={{ color: '#fff' }}>
        <h2>Login</h2>
        <form>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            QR Number:
            <input type="text" value={qrNumber} onChange={(e) => setQRNumber(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>New Guest? <a href="/">Register</a></p>
        {loginError && <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>}
      </div>
    );
  };
  
  export default Login;
  
  
