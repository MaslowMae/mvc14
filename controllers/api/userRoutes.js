const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
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

module.exports = router;