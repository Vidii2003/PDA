import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Simple GET route to test the API
router.get('/name', async (req, res) => {
  try {
    res.status(200).json({ msg: "Successful" });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, regno } = req.body;

  // Input validation (basic example)
  if (!name || !email || !password || !regno) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      regno
    });

    await user.save();

    // Create a token
    const token = jwt.sign(
      { id: user._id, regno: user.regno }, // Use user._id in token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token }); // Respond with token and status 201 (created)
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign(
      { id: user._id, regno: user.regno }, // Include more relevant info in token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token }); // Respond with token and status 200 (OK)
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
