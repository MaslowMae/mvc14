const router = require("express").Router();
const models = require('../models');

console.log("made it to dashboard routes ");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ["username", "Email"],
      include: [{ model: Post, attributes: ["postTitle"] }],
    });
    const posts = userData.map((user) => user.get({ plain: true }));
    res.render("profile", { posts });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
  module.exports = router;