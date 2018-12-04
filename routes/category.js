const { Category } = require("../models/Category");
const validateCategory = require("../middleware/validation");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("admin/index");
});

router.get("/category", async (req, res) => {
  res.render("admin/category");
});

router.post("/category", async (req, res) => {
  const { value, error } = validateCategory(req.body);
  if (error) {
    return res.render("admin/category", { error: error.details[0].message });
  }

  const category = new Category({
    name: value.category
  });

  try {
    await category.save();
    res.render("admin/category", { success: "category added successfully" });
  } catch (error) {
    return res.render("admin/category", {
      error: "failed to save category, please try again later"
    });
  }
});

module.exports = router;
