const Post = require("../models/Post");
const express = require("express");
const router = express.Router();

// Route for /blog
router.get("/", async (req, res) => {
  res.redirect("/blog/1");
});

// Route for /blog with pagination
router.get("/:pageNumber", async (req, res) => {
  const pageNumber = req.params.pageNumber;
  const pageSize = 10;
  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    post1,
    post2,
    pageNumber: parseInt(pageNumber)
  });
});

// Route to get posts by category
router.get("/posts/:category", async (req, res) => {
  const category = req.params.category;
  const pageNumber = 1;
  let posts = await Post.find({ category }).sort("-published");

  if (posts.length > 10) {
    posts = await Post.find({ category })
      .sort("published")
      .limit(10);

    res.render("category", {
      posts,
      category,
      pageNumber
    });
  } else {
    res.render("category", { posts, category });
  }
});

// Route to get posts by category with pagination
router.get("/posts/:category/:pageNumber", async (req, res) => {
  const { pageNumber, category } = req.params;
  const pageSize = 10;

  let posts = await Post.find({ category })
    .sort("-published")
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  res.render("category", {
    posts,
    category,
    pageNumber: parseInt(pageNumber)
  });
});

// Route to get single post
router.get("/:category/:url", async (req, res) => {
  const url = req.params.url;

  const post = await Post.findOne({ url }).limit(1);
  const views = ++post.views;

  await Post.update({ _id: post._id }, { $set: { views } });

  res.render("post", {
    post
  });
});

// Route to search for posts
router.post("/posts/search", async (req, res) => {
  const { search } = req.body;
  let posts = await Post.find({ $text: { $search: search } }).sort(
    "-published"
  );

  res.render("search", { posts });
});

module.exports = router;
