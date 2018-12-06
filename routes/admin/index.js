const { Category } = require("../../models/Category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("admin/index");
});

router.get("/post", async (req, res) => {
  const categories = await Category.find().select("name -_id");

  res.render("admin/post", {
    categories
  });
});

router.get("/category", async (req, res) => {
  res.render("admin/category");
});

router.get("/login", async (req, res) => {
  res.render("admin/login");
});

router.get("/register", async (req, res) => {
  res.render("admin/register");
});

router.get("/password", async (req, res) => {
  res.render("admin/password");
});

module.exports = router;
