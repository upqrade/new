// import logo from './logo.svg';
// import './App.css';
// import PhoneNumberLogin from './Components/PhoneNumberLogin';

// function App() {
//   return (
//     <div className="App">
//       <PhoneNumberLogin />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneNumberLogin from './Components/PhoneNumberLogin';
import Login from './Components/Login';
import DisplayPage from './Components/DisplayPage';
import ScanQR from './Components/ScanQR';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PhoneNumberLogin />} />
          <Route path="/scanQR" element={<ScanQR/>}/>
          <Route path="/login" element={<Login />} />

          <Route path="/getUserData/:qrNumber" element={<DisplayPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;







