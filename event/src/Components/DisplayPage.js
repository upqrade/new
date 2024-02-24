import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';


const DisplayPage = () => {
  const [userData, setUserData] = useState(null);
  const { qrNumber } = useParams();

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

  const handleSubmit = async () => {
    try {
      const templateParams = {
        to_email: userData.email,
        to_name: userData.name,
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
  };

  

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