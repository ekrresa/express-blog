const Post = require("../models/Post");
const { Category } = require("../models/Category");
const express = require("express");
const router = express.Router();

// Get list of categories
router.get("/categories", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");

  return res.json(categories);
});

// Get posts grouped by month and year
router.get("/posts/group", async (req, res) => {
  let group = await Post.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$published" },
          month: { $month: "$published" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } }
  ]);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  group.forEach(row => {
    row._id.month = month[row._id.month - 1];
  });
  return res.json(group);
});

module.exports = router;
