const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const postData = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Post, attributes: ["id", "postTitle", "post_content", "user_id"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }
      res.render("homepage", {
        posts,
        countVisit: req.session.countVisit,
      });
    });
    } catch (err) {
      console.log(error)
      res.status(500).json({error:"Issue with sessions in homeroutes"});
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
      ],
    });
    if (postsData) {
      const post = postData.get({ plain: true });
      res.render('post', { post });
    } else {
    res.status(404).json({ error: "No Posts Here..." });
  }
  } catch (err) {
    res.status(500).json({ error: "Issue with getting post data" });
    }
    });

//get log in page
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