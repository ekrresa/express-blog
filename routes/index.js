const Post = require("../models/Post");
const { requestLog } = require("../middleware/winston");
const express = require("express");
const router = express.Router();

// Homepage route
router.get("/", requestLog, async (req, res) => {
  const posts = await Post.find().limit(10);

  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    post1,
    post2,
    pageNumber: 1
  });
});

// About page route
router.get("/about", requestLog, (req, res) => {
  res.render("about");
});

// Contact page route
router.get("/contact", requestLog, async (req, res) => {
  res.render("contact");
});

// Privacy page route
router.get("/disclaimer", requestLog, async (req, res) => {
  res.render("disclaimer");
});

module.exports = router;
