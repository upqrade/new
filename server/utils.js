// utils.js

const crypto = require('crypto');

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
  return secretKey;
};

module.exports = {
  generateSecretKey,
};
