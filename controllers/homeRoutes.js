const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { withAuth } = require("../utils/auth");

// Function to render homepage
const renderHomepage = async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Comment,
          attributes: ['comment_text'],
        },
      ],
      order: [['id', 'DESC']]  // Sort by ID in descending order
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));

    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }

      res.render("homepage", {
        posts,
        countVisit: req.session.countVisit,
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET all of the posts for homepage
router.get("/", renderHomepage);
router.get("/homepage", renderHomepage); // Added route for /homepage

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text'],
        },
      ]
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('post', { post });
    } else {
      res.status(404).json({ error: "No Posts Here..." });
    }
  } catch (err) {
    res.status(500).json({ error: "Issue with getting post data" });
  }
});

// GET login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// GET signup page
router.get("/signup", (req, res) => {
  console.log("Signup");
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;