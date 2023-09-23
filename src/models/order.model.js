"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("newOrder", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "in progress", "delivered"),
        defaultValue: "pending",
    },
    specialRequest: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    });
    // description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // price: {
    //   type: DataTypes.INTEGER,
    // },
    // imgURL: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: true,
    // },
    // category: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   defaultValue: ["Other"],
    // },
    // userID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
//   });

module.exports = Post;
