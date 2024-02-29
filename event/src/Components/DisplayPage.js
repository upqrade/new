import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';


const DisplayPage = () => {
  const [userData, setUserData] = useState(null);
  const [loginError, setLoginError] = useState(false); // Add this line
  const { qrNumber } = useParams();
  const [presentToken, setPresentToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://event-server2.onrender.com/getUserData/${qrNumber}`);
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
if (!contentType || !contentType.includes('application/json')) {
  throw new Error('Invalid content type. Expected JSON.');
}

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, [qrNumber]);

  const verifyToken = async () =>{
    try {
      const response = await fetch('https://event-server2.onrender.com/api/tokenVerify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ presentToken }),
      });

      const data = await response.json();

      if (response.ok) {// Store the token in local storage
        // window.location.href="./admin";
        return
        console.log(response.message);
        // setLoginError(false);
      } else {
        // Login failed
        // setPresentToken('');
        localStorage.setItem('token', '')
        window.location.href="./admin";
        console.log(response.message);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError(true);
    }
  }

  const handleSubmit = async () => {
          // Retrieve the email from localStorage
          const userEmail = localStorage.getItem('userEmail');
          const userName = localStorage.getItem('userName');
          const userPhoneNumber = localStorage.getItem('userPhoneNumber');

          
    try {
      const templateParams = {
        to_name: userData.name,
        to_email: userData.email,
        to_phone_number: userData.phoneNumber,
        name: userName,
        email: userEmail,
        phone_number: userPhoneNumber,

        // Add more template parameters as needed
      };

      const result = await emailjs.send(
        'service_bnz3qy9',
        'template_jggssck',
        templateParams,
        'Acnzw1AS8KGhKspGo'
      );

      console.log(result);

      // Handle success or failure
      if (result.text === 'OK') {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }

    try {

      if (!userEmail) {
        console.error('User email not found in localStorage.');
        alert('Failed to send email. User email not found.');
        return;
      }
      const templateParams = {
        name: userName,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        to_email: userData.email,
        to_name: userData.name,
        to_phone_number: userData.phoneNumber
        // Add more template parameters as needed
      };

      const result = await emailjs.send(
        'service_bnz3qy9',
        'template_mophnb9',
        templateParams,
        'Acnzw1AS8KGhKspGo'
      );

      console.log(result);

      // Handle success or failure
      if (result.text === 'OK') {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }


  };

  

  useEffect(() => {
    // Check if the user has a valid token

    if (!presentToken && presentToken.length < 10) {
      // Redirect to login if no token is present
      window.location.href = '/login';
    }
    
    verifyToken();

  }, []);


  return (
    <div style={{ color: 'white', textAlign: 'center', margin: 'auto', marginTop: '50px', marginBottom: '50px' }}>
      {userData ? (
        <div>
          <h1>User Details</h1>
          <p>Name: {userData.name}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Email: {userData.email}</p>
          <p>QR Number: {userData.qrNumber}</p>
          <button className='btn-btn primary' onClick={handleSubmit}>Connect</button>
        </div>
      ) : (
        <p>Not Registered Yet...</p>
      )}
    </div>
  );
};

export default DisplayPage;
