const Post = require("../models/Post");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().limit(10);
  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    post1,
    post2,
    pageNumber: 1
  });
});

router.get("/:pageNumber", async (req, res) => {
  const pageNumber = req.params.pageNumber;
  const pageSize = 10;
  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  res.render("index", {
    posts,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/posts/:category", async (req, res) => {
  const category = req.params.category;
  // const pageNumber = 2;
  // const pageSize = 10;

  const posts = await Post.find({ category });
  // return res.json(posts);

  res.render("index", { posts });
});

router.get("/:category/:url", async (req, res) => {
  const url = req.params.url;

  const post = await Post.findOne({ url }).limit(1);

  res.render("post", {
    post
  });
});

module.exports = router;
