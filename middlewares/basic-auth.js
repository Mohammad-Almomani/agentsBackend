"use strict";

const { Users } = require("../models");
/* istanbul ignore next */
const checkUser = async (req, res, next) => {
  try {
    // Search for the email in the database
    const email = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email already exist");
    }

    // Search for the username in the Database
    const username = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    next();
  } catch (e) {
    res.status(500).send("Internal Server Error");
    console.log(e);
  }
};

module.exports = checkUser;
