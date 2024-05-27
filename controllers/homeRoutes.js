const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { withAuth } = require("../utils/auth");


//GET all of the posts for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await User.findAll({
      include: [
        { 
          model: User, 
          attributes: { exclude: ["password"] },
        },
        {
          model: Comment,
          attributes: ['comment_text'],
        },
      ]
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));


       // We set up a session variable to count the number of times we visit the homepage
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
});



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


//get signup page
router.get("/signup", (req, res) => {
  console.log("Signup");
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;