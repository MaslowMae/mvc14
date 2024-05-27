const express = require('express');
const router = require("express").Router();
// const {User } = require ("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

router.post("/homepage", async (req, res) => {
    console.log("new user?");
    try {
      // Extract form data from request body
      const { email, username, password } = req.body;
  
      // Create a new user using Sequelize model
      const newUser = await User.create({
        email,
        username,
        password,
      });  
    // Send a success response
    console.log(newUser);
    // Assuming you have a login page named 'login.handlebars'
    res.render("login");
  } catch (error) {
    // If an error occurs, handle it appropriately
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});


// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: ["username", "email"], // "Email" should be "email" to match the attribute name
//       include: [{ model: Post, attributes: ["postTitle"] }],
//     });
//     const posts = userData.map((user) => user.get({ plain: true }));
//     res.render("homepage", { posts }); // Corrected view name
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post('/users', async (req, res) => {
//   try {
//     const userData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//       });
//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.username = userData.username;
//         req.session.loggedIn = true;
//         res.redirect('/homepage');
//       });
//   }
//   catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//     }
// });

  
// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;