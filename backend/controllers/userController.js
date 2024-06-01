const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.send('User registered successfully');
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
};


// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email'); // Adjust fields as needed
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const searchUsers = async (req, res) => {
  const searchQuery = req.body.q; // Get search query from req.body
  try {
    const users = await User.find(
      { username: { $regex: searchQuery, $options: 'i' } },
      'username email'
    ); // Adjust fields as needed
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err);
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password field
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser ,fetchAllUsers, searchUsers ,getUserProfile};