import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PhoneNumberLogin.css'

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
    <div className="ph_no">
      {userData ? (
        <div>
          <h1>User Details</h1>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{userData.phoneNumber}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>QR Number:</td>
                <td>{userData.qrNumber}</td>
              </tr>
            </tbody>
          </table>
          <br />

        </div>
      ) : (
        <p style={{padding: '120px'}}>Not Registered Yet...</p>
      )}
    </div>
  );
};


export default DisplayPage1;
