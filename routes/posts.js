const Post = require("../models/Post");
const { Category } = require("../models/Category");
const express = require("express");
const router = express.Router();

router.post("/posts/search", async (req, res) => {
  const { search } = req.body;
  let posts = await Post.find({ $text: { $search: search } }).sort(
    "-published"
  );
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");

  res.render("search", { posts, categories });
});

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
  return res.send(group);
});

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

router.get("/:pageNumber", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const pageNumber = req.params.pageNumber;
  const pageSize = 10;
  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const post1 = posts.slice(0, 3);
  const post2 = posts.slice(3, 10);
  res.render("index", {
    categories,
    post1,
    post2,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/posts/:category", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const category = req.params.category;
  const pageNumber = 1;
  let posts = await Post.find({ category }).sort("-published");

  if (posts.length > 10) {
    posts = await Post.find({ category })
      .sort("published")
      .limit(10);

    res.render("category", {
      categories,
      posts,
      category,
      pageNumber
    });
  } else {
    res.render("category", { posts, categories });
  }
});

router.get("/posts/:category/:pageNumber", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const pageNumber = req.params.pageNumber;
  const category = req.params.category;
  const pageSize = 10;

  let posts = await Post.find({ category })
    .sort("-published")
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  res.render("category", {
    categories,
    posts,
    category,
    pageNumber: parseInt(pageNumber)
  });
});

router.get("/:category/:url", async (req, res) => {
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const url = req.params.url;

  const post = await Post.findOne({ url }).limit(1);

  res.render("post", {
    categories,
    post
  });
});

module.exports = router;
