// server.js

const express = require('express');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://saniton7navelkar:08322777636@cluster0.hiiwdnw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const userDataSchema = new mongoose.Schema({
  qrNumber: { type: Number, unique: true },
  name: String,
  phoneNumber: String,
  registrationTime: String,
  ipAddress: String,
  email: String, // Add email field to the schema
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

app.use(requestIp.mw({ attributeName : 'clientIp', headerName : 'X-Forwarded-For' }));

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
      email, // Include email in the registration data
    });

    await newRegistration.save();

    return res.status(200).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
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
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
