const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./posts");
const commentRoutes = require("./comments");
// const loginRoutes = require('./login');
// const logoutRoutes = require('./logout');
// const profileRoutes = require('./profile');
// const searchRoutes = require('./search');
const signupRoutes = require("../signupRoutes")
const {User, Post, Comment } = require ("../../models");

// Define the errorHandler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  };

// Use routes
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes)
router.use("/signup",signupRoutes)

// Error handling middleware
router.use(errorHandler);

console.log('made it to api index');

module.exports = router;