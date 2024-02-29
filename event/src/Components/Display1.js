import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DisplayPage1 = () => {
  const [userData, setUserData] = useState(null);
  const { qrNumber } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://event-server2.onrender.com/getData/${qrNumber}`);

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

  return (
    <div style={{ color: 'white', textAlign: 'center', margin: 'auto', marginTop: '50px', marginBottom: '50px' }}>
      {userData ? (
        <div>
          <h1>User Details</h1>
          <p>Name: {userData.name}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Email: {userData.email}</p>
          <p>QR Number: {userData.qrNumber}</p>
        </div>
      ) : (
        <p>Not Registered Yet...</p>
      )}
    </div>
  );
};

export default DisplayPage1;
