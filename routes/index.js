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

router.get("/about", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  res.render("about", { categories });
});

router.get("/contact", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  res.render("contact", { categories });
});

router.get("/disclaimer", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");

  res.render("disclaimer", { categories });
});

module.exports = router;
