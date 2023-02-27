"use strict";

const { Users } = require("../models");
/* istanbul ignore next */
const bearerCheck = async (req, res, next) => {

  if (!req.headers.authorization) return res.status(401).send("Invalid Login");
  console.log("Bearer middleware");
  const token = req.headers.authorization.split(" ").pop();
  try {
    const validUser = Users.authenticateToken(token);
    console.log(validUser);
    let userInfo = await Users.findOne({
      where: { username: validUser.username },
    });
    if (userInfo) {
      req.user = userInfo;
      req.body.username = userInfo.username;
      req.token = userInfo.token;
      next();
    } else {
      return res.send("Invalid Login");
    }
  } catch (e) {
    next(e.message || e);
  }
};
module.exports = bearerCheck;
