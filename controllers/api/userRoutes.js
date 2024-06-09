const router = require("express").Router();
const { User } = require('../../models');
const { Post } = require('../../models'); // Assuming you have a Post model
const withAuth = require("../../utils/auth");


// Route for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/homepage'); // Redirect to homepage after successful login
    });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

// Example route to render the homepage (replace with your actual homepage route)
router.get('/homepage', async (req, res) => {
  try {
    // Example logic to fetch data for homepage
    const userData = await User.findAll({
      attributes: ["username", "email"],
      include: [{ model: Post, attributes: ["postTitle"] }],
    });
    const posts = userData.map((user) => user.get({ plain: true }));
    res.render("homepage", { posts });
  } catch (err) {
    console.error("Error rendering homepage:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;