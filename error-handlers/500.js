"use strict";

const { Post, Comment, Users, commentModel } = require("../models/index");

/*eslint-disable no-unused-vars*/
module.exports = async (req, res, next) => {
  if (req.url.toLowerCase().includes("comment")) {
    let postID = req.params.postID || null;
    let userID = req.params.userID || null;

    if (isNaN(postID)) postID = -1;
    if (isNaN(userID)) userID = -1;

    let rout;
    rout = await commentModel.findOne({ where: { postID: postID , userID: userID} });
    console.log("from 500");
    if (!rout) {
      return res.status(500).send({
        code: 500,
        message: isNaN(req.params.postID) 
          ? `${req.params.postID} is not a valid ID`
          : isNaN(req.params.userID)? `${req.params.userID} is not a valid ID`
            : `Comment /${req.params.postID}/${req.params.userID} not found`,
      });
    } else next();
  } else {
    let id = req.params.id || null;
    let routCheck = req.url.toLowerCase();

    if (isNaN(id)) id = -1;

    let rout;
    routCheck.includes("post")
      ? (rout = await Post.read(id))
      : routCheck.includes("user")
        ? (rout = await Users.findOne({ where: { id: id } }))
        : (rout = await Comment.read(id));
    if (!rout) {
      return res.status(500).send({
        code: 500,
        message: isNaN(req.params.id)
          ? `${req.params.id} is not a valid ID`
          : `${
            routCheck.includes("post")
              ? "Post"
              : routCheck.includes("user")
                ? "user"
                : "Comment"
          } ${req.params.id} not found`,
      });
    } else next();
  }
};
