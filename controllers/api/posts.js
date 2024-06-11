const router = require("express").Router();
const {User, Post, Comment } = require ("../../models");
const {withAuthApi} = require("../../utils/auth.js");


router.get("/", async (req, res) => {
console.log("getting posts");
  // res.send("hello");
  try {
    const postData = await Post.findAll({
      attributes: ["id","postTitle", "post_content"],
      include: [{ model: User, attributes: ["username"] }],
    });
     res.status(200).json(postData);
  } catch (err) {
     res.status(400).json(err);
  }
});

router.post("/", withAuthApi, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuthApi, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuthApi, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;