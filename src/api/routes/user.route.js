"use strict";

const express = require("express");
const checkUser = require("../middlewares/basic-auth");
const error500 = require("../error-handlers/500");

const router = express.Router();
const {
  signup,
  allUser,
  login,
  deleteUser,
  getUser,
  getProfile,
  updateCart
} = require("../../actions/controllers/userController");
const bearerCheck = require("../middlewares/bearer-auth");

// Routes
router.post("/signup", checkUser, signup);
router.post("/signIn", login);
router.get("/profile", bearerCheck, getProfile);

router.put("/cartUpdate", bearerCheck, updateCart);

router.get("/user", allUser);
router.get("/user/:id", getUser);

router.delete("/user/:id", error500, deleteUser);

module.exports = router;
