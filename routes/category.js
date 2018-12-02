const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

router.get("/category", async (req, res) => {
  res.render("admin/category");
});

router.post("/category", async (req, res) => {
  const category = new Category({
    name: req.body.category
  });
  await category.save();
  res.redirect("index");
  res.location("index");
});

module.exports = router;
