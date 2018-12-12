const Post = require("../models/Post");
const { Category } = require("../models/Category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().limit(10);
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    categories,
    post1,
    post2,
    pageNumber: 1
  });
});

router.get("/:pageNumber", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const pageNumber = req.params.pageNumber;
  const pageSize = 10;
  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    categories,
    post1,
    post2,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/posts/:category", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const category = req.params.category;
  const pageNumber = 1;
  let posts = await Post.find({ category }).sort("-published");

  if (posts.length > 10) {
    posts = await Post.find({ category })
      .sort("published")
      .limit(10);

    res.render("category", {
      categories,
      posts,
      category,
      pageNumber
    });
  } else {
    res.render("category", { posts, categories });
  }
});

router.get("/posts/:category/:pageNumber", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const pageNumber = req.params.pageNumber;
  const category = req.params.category;
  const pageSize = 10;

  let posts = await Post.find({ category })
    .sort("-published")
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  res.render("category", {
    categories,
    posts,
    category,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/:category/:url", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const url = req.params.url;

  const post = await Post.findOne({ url }).limit(1);

  res.render("post", {
    categories,
    post
  });
});

module.exports = router;
