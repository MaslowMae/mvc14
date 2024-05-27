const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require("./User");
const Post = require("./Post");

class Comment extends Model {}

Comment.init ({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'username',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
    }, 
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false,
  });


console.log('made it to Comment model');

module.exports = 
  Comment
;
