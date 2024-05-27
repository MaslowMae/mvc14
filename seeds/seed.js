const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData= require("./commentData.json");


const seedDatabase = async () => {
try {    
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    const posts = await Post.bulkCreate(postData);

    const comments = await Comment.bulkCreate(commentData);

    console.log("Seeded database successfully");
  } catch (error) {
    console.error("Failed to seed database:", error);
  } finally {
    process.exit(0);
  }
};
seedDatabase();