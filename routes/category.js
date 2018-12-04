const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("admin/index");
});

router.get("/category", async (req, res) => {
  res.render("admin/category");
});

router.post("/category", async (req, res) => {
  if (!req.body.category) {
    return res.render("admin/category", {
      error: "category name is required"
    });
  }
  const category = new Category({
    name: req.body.category
  });
  await category.save();
  res.redirect("/admin");
});

module.exports = router;
