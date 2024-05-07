const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async ({ username, password }) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    return { message: 'User registered successfully', token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Server error');
  }
};

const login = async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return { message: 'User not found', token: null };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { message: 'Invalid password', token: null };
      }
      const token = generateToken(user._id);
      return { message: 'User login successfully', token };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Server error');
    }
  };
  

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
};

module.exports = { register, login };
