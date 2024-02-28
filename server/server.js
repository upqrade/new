// server.js
const express = require('express');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');
const { generateSecretKey } = require('./utils'); // Adjust the path accordingly

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://saniton7navelkar:08322777636@cluster0.hiiwdnw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const userDataSchema = new mongoose.Schema({
  qrNumber: { type: Number, unique: true },
  name: String,
  phoneNumber: String,
  registrationTime: String,
  ipAddress: String,
  email: String,
});

userDataSchema.pre('save', function (next) {
  const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  this.registrationTime = currentDate;
  next();
});

const UserData = mongoose.model('eventmanager', userDataSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestIp.mw({ attributeName: 'clientIp', headerName: 'X-Forwarded-For' }));

const JWT_SECRET_KEY = generateSecretKey();

// // Middleware for verifying JWT
// const authenticateJWT = async (req, res, next) => {
//   const token = req.header('Authorization') || req.query.token; // Adjust to also check query parameter

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     // Modify to retrieve the token from localStorage
//     // If you store the token with a key, replace 'your_token_key' with the actual key
//     const localStorageToken = localStorage.getItem('token');

//     if (!localStorageToken || localStorageToken !== token) {
//       return res.status(401).json({ error: 'Unauthorized - Token mismatch' });
//     }

//     const decoded = await jwt.verify(token, JWT_SECRET_KEY);

//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token expired' });
//     }
//     // return res.status(403).json({ error: 'Invalid token' });
//   }
// };

// // Route for checking authentication
// app.get('/api/check-auth', authenticateJWT, (req, res) => {
//   console.log('Received Token:', req.header('Authorization'));
//   return res.status(200).json({ message: 'Authentication successful' });
// });



app.post('/saveData', async (req, res) => {
  console.log('Request Headers:', req.headers);

  try {
    const ipAddress = req.clientIp;
    console.log('User IP Address:', ipAddress);

    const { name, phoneNumber, qrNumber, email } = req.body;

    if (qrNumber < 1) {
      return res.status(400).json({ error: 'Invalid qrNumber. It should be between 1 and 5.' });
    }

    const existingRegistration = await UserData.findOne({ qrNumber });

    if (existingRegistration) {
      return res.status(400).json({ error: 'QR Number is already registered.' });
    }

    const newRegistration = new UserData({
      qrNumber,
      name,
      phoneNumber,
      ipAddress,
      email,
    });

    await newRegistration.save();

    return res.status(200).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { name, qrNumber } = req.body;

    const user = await UserData.findOne({ name, qrNumber });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ user }, JWT_SECRET_KEY);
    
    // Include the user's email in the response
    res.json({ success: true, token, user: { email: user.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


app.post('/api/tokenVerify', (req, res) => {
  const { presentToken } = req.body;


  try {
    const decode = jwt.verify(presentToken, JWT_SECRET_KEY);
    res.status(200).json({ success: true, date: decode });
  }
  catch (e) {
    console.log('------', e.message, '-------')
    res.status(401).json({ success: false, message: ('Error while decoding token, Error: '+ e.message) });
  }
});

app.get('/getUserData/:qrNumber', async (req, res) => {
  const { qrNumber } = req.params;

  try {
    const userData = await UserData.findOne({ qrNumber });
    if (!userData) {
      return res.status(404).json({ error: 'User data not found.' });
    }
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
