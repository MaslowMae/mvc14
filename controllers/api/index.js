const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./posts");
const commentRoutes = require("./comments");


router.use("./posts", postRoutes);
router.use("./users", userRoutes);
router.use("./comments", commentRoutes)


console.log('made it to api index');

module.exports = router;