"use strict";

const checkGetPost = async (req, res, next) => {
  try {
    if (req.user.capabilities.includes("read")) {
      next();
    } else {
      res.status(403).send("You are not authorized to read the posts");
    }
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

const checkGetOnePost = async (req, res, next) => {
  try {
    if (req.user.capabilities.includes("read")) {
      next();
    } else {
      res.status(403).send("You are not authorized to read the posts");
    }
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

const checkCreatePost = async (req, res, next) => {
  try {
    if (req.user.capabilities.includes("create")) {
      next();
    } else {
      res.status(403).send("You are not authorized to create a post");
    }
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

const checkUpdatePost = async (req, res, next) => {
  try {
    if (req.user.capabilities.includes("update") || req.user.username === req.body.username) {
      next();
    } else {
      res.status(403).send("You are not authorized to create to a update post");
    }
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

const checkDeletePost = async (req, res, next) => {
  try {
    if (req.user.capabilities.includes("delete") || req.user.username === req.body.username) {
      next();
    } else {
      res.status(403).send("You are not authorized to create to delete a post");
    }
  } catch (error) {
    /* istanbul ignore next */
    console.log(error);
  }
};

module.exports = {
  checkGetPost,
  checkCreatePost,
  checkUpdatePost,
  checkDeletePost,
  checkGetOnePost,
};
