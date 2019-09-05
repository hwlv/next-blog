const JWT = require('jsonwebtoken');

const JWT_SECRET = 'system-user-token';

exports.createToken = (config = {}, expiresIn = '7 days') => {
  const { userName, _id } = config;
  const options = { userName, _id };
  const custom = { expiresIn };
  return JWT.sign(options, JWT_SECRET, custom);
};

exports.JWT_SECRET = JWT_SECRET;
