const router = require("express").Router();
const {User, Post, Comment } = require ("../../models");
const {withAuthApi} = require("../../utils/auth");

router.get("/", withAuthApi, async (req, res) => {
    try {
        const commentData = await Post.findAll({
            attributes: ["comments", "comment_text"],
            include: [{ model: User, attributes: ["username"] }],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }

    res.render("comment");


});
router.post("/", withAuthApi, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
    res.render("comment");
});
router.delete("/:id", withAuthApi, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

    module.exports = router;
    



