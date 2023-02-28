"use strict";

const express = require("express");
const router = express.Router();
const error500 = require("../error-handlers/500");
const {
  checkGetPost,
  checkCreatePost,
  checkDeletePost,
  checkUpdatePost,
  checkGetOnePost
} = require("../middlewares/acl");
const bearerCheck = require("../middlewares/bearer-auth");

const { Post, commentModel } = require("../models/index");
const { imgUpload } = require("../upload/imagesUplaod");

// Routes
router.get("/post", postsWithComments);
router.get("/post/:id", error500,bearerCheck, checkGetOnePost, onePostWithComments);

router.post("/post", imgUpload.array("imgURL", 1), bearerCheck, checkCreatePost, createPost);
router.put("/post/:id", imgUpload.array("imgURL", 1), error500, bearerCheck, checkUpdatePost, updatePost);

router.delete("/post/:id", error500, bearerCheck, checkDeletePost, deletePost);
async function createPost(req, res) {
  // upload images to the server
  if (req.files) {
    req.body.imgURL = await req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file.filename}`
    );
  }
  // parse the category from string to array
  req.body.category = JSON.parse(req.body.category)
  const newPost = req.body;
  const post = await Post.create(newPost);
  return res.status(201).json(post);
}

async function updatePost(req, res) {
  if (req.files) {
    req.body.imgURL = await req.files.map(
      (file) => `${process.env.BACKEND_URL}/${file.filename}`
    );
  }
  try {
    req.body.category = JSON.parse(req.body.category)
    
  } catch (error) {
    console.log(error)
  }
  const id = req.params.id;
  const obj = req.body;

  const updatedPost = await Post.update(id, obj);
  return res.status(202).json(updatedPost);
}

async function deletePost(req, res) {
  const id = req.params.id;
  await Post.delete(id);
  return res.status(204).send("Post deleted successfully");
}

async function postsWithComments(req, res) {
  const fullPost = await Post.readWithComments(commentModel);
  return res.status(200).json(fullPost);
}

async function onePostWithComments(req, res) {
  const id = req.params.id;
  const fullPost = await Post.readWithComments(commentModel, id);
  return res.status(200).json(fullPost);
}

module.exports = router;
