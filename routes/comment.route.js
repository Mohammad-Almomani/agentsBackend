const express = require("express");
/*eslint-disable*/
const router = express.Router();
const error500 = require("../error-handlers/500");

const { Comment } = require("../models/index");

// Routes
router.get("/comment", getComments);
router.get("/comment/:postID/:userID", error500, getUserOnPostComments);
// router.get("/comment/:postID", error500, getPostComments);

router.post("/comment", createComment);
router.put("/comment/:id", error500, updateComment);
router.delete("/comment/:id", error500, deleteComment);

async function getComments(req, res) {
  let allComments = await Comment.read();
  return res.status(200).json({
    allComments,
  });
}
/* istanbul ignore next */
async function getUserOnPostComments(req, res) {
  const postID = req.params.postID;
  const userID = req.params.userID;
  const comment = await Comment.readSpecificComment(postID, userID);

  return res.status(200).json(comment);
}
// async function getPostComments(req, res) {
//   const postID = req.params.postID;
//   const comment = await Comment.readComments(postID );

//   return res.status(200).json(comment);
// }

/* istanbul ignore next */
async function createComment(req, res) {
  const newComment = req.body;
  console.log("newwww hereeeeeeeeee", newComment);
  const comment = await Comment.create(newComment);
  console.log("here check", comment);
  const postComments = await Comment.readComments(comment.id);
  return res.status(201).json(postComments);
}

/* istanbul ignore next */
async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const comment = await Comment.update(id, obj);
  return res.status(202).json(comment);
}
/* istanbul ignore next */
async function deleteComment(req, res) {
  const id = req.params.id;
  await Comment.delete(id);
  return res.status(204).send("Post deleted successfully");
}

module.exports = router;
