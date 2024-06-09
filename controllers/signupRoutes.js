
// Import required modules
const express = require('express');
const router = express.Router();
const { User } = require('../models');


// Define the POST route handler for /signup
router.post('/signup', async (req, res) => {
  try {
    // Extract form data from request body
    const { email, username, password } = req.body;
    
    // Create a new user using the User model
    const newUser = await User.create({ email, username, password });

    // Optionally, redirect the user to a different page after successful signup
    res.redirect('/login');
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});
  // Export the router
module.exports = router;