"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("newItem", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    imgURL: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Post;
