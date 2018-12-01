const Post = require("../models/Post");
const express = require("express");
const router = express.Router();

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

// Get count of posts, use to create page nav links.
// Then get 10 posts each time with page number query param
module.exports = router;
