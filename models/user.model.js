"use strict";
const jwt = require("jsonwebtoken");
/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("UsersRoles", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign(
          {
            username: this.username,
          },
          process.env.JWT_SECRET
        );
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.env.JWT_SECRET);
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const acl = {
          admin: ["read", "create", "delete", "update"],
          user: ["read", "create"]
        };
        return acl[this.role];
      },
    },
  });

  User.authenticateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };
  return User;
};
