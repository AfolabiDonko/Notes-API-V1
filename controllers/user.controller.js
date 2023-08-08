const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
require('dotenv').config();

const User = db.users;

const TOKEN_EXPIRATION = '1h';
const PASSWORD_MIN_LENGTH = 4;
const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 20;

const validateSignupForm = (username, password) => {
  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
    };
  }
  const usernameRegex = /^[a-z]+$/;
  if (!usernameRegex.test(username)) {
    return { error: 'Username can only contain lowercase letters (a-z).' };
  }
  if (
    username.length < USERNAME_MIN_LENGTH ||
    username.length > USERNAME_MAX_LENGTH
  ) {
    return {
      error: `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters long.`,
    };
  }
  return null;
};

exports.create = async (req, res) => {
  try {
    const { username, password } = req.body;
    const signupValidation = validateSignupForm(username, password);
    if (signupValidation) {
      return res.status(400).json(signupValidation);
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: 'This username is already associated with an account.',
      });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.status(201).json({
      message: 'User created successfully.',
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { username, password } = req.body;
    const signupValidation = validateSignupForm(username, password);
    if (signupValidation) {
      return res.status(400).json(signupValidation);
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(403).json({ error: 'This username is unknown.' });
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(403).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ username }, process.env.JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.status(200).json({
      message: 'User logged in successfully.',
      token,
      expire: TOKEN_EXPIRATION,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while logging in.',
    });
  }
};
