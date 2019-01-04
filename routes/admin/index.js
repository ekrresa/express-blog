const { Category } = require("../../models/Category");
const Post = require("../../models/Post");
const express = require("express");
const router = express.Router();

const redirectLogin = (req, res, next) => {
  if (!req.session.name) {
    res.redirect("/admin/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.name) {
    res.redirect("/admin");
  } else {
    next();
  }
};

router.get("/", redirectLogin, async (req, res) => {
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

router.get("/post", redirectLogin, async (req, res) => {
  const categories = await Category.find().select("name -_id");

  res.render("admin/post", {
    categories
  });
});

router.get("/category", redirectLogin, (req, res) => {
  res.render("admin/category");
});

router.get("/login", redirectHome, (req, res) => {
  res.render("admin/login");
});

router.get("/register", redirectHome, (req, res) => {
  res.render("admin/register");
});

router.get("/password", redirectHome, (req, res) => {
  res.render("admin/password");
});

router.get("/:pageNumber", redirectLogin, async (req, res) => {
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

module.exports = router;
