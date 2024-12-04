const express = require('express');
const { check } = require('express-validator'); // For validation
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Validation for registering a user
router.post('/register', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], registerUser);

// Validation for logging in a user
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], loginUser);

// Additional route for admin registration (optional)
router.post('/admin/register', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], (req, res) => {
  req.body.userType = 'admin'; // Set userType to admin for this route
  registerUser(req, res); // Call registerUser with modified body
});

module.exports = router;
