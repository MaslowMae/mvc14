// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                if (newUserData.email) {
                    newUserData.email = newUserData.email.toLowerCase();
                }
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData.email) {
                    updatedUserData.email = updatedUserData.email.toLowerCase();
                }
                return updatedUserData;
            },
        }, 
    }, {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: "User",
        tableName: "users",
    }
);

module.exports = User;