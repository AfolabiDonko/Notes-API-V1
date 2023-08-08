const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

const User = db.users;
// cette fonctionne permet de décoder le token et de renvoyer l'utilisateur concerné
const getUserFromToken = async (token, res) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (decodedToken.exp <= Date.now() / 1000) {
      return res
        .status(401)
        .json({ error: 'Token expired. Please log in again.' });
    }
    const user = await User.findOne({ username: decodedToken.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
module.exports = {
  getUserFromToken,
};
