const { Category } = require("../../models/Category");
const Post = require("../../models/Post");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find()
    .select("title category published url")
    .sort("-published")
    .limit(10);

  const postCount = await Post.find().count();
  const categoriesCount = await Category.find().count();
  res.render("admin/index", {
    posts,
    postCount,
    categoriesCount,
    pageNumber: 1
  });
});

router.get("/:pageNumber", async (req, res) => {
  const postCount = await Post.find().count();
  const categoriesCount = await Category.find().count();
  const pageNumber = req.params.pageNumber;
  const pageSize = 10;

  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  res.render("admin/index", {
    postCount,
    categoriesCount,
    posts,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/post", async (req, res) => {
  const categories = await Category.find().select("name -_id");

  res.render("admin/post", {
    categories
  });
});

router.get("/category", (req, res) => {
  res.render("admin/category");
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/register", (req, res) => {
  res.render("admin/register");
});

router.get("/password", (req, res) => {
  res.render("admin/password");
});

module.exports = router;
