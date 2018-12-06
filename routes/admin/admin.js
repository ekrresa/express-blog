const { Category } = require("../../models/Category");
const Post = require("../../models/Post");
const User = require("../../models/User");
const {
  validateCategory,
  validatePost,
  validateUser
} = require("../../helpers/validation");
const { upload } = require("../../middleware/images");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { value, error } = validateUser(req.body);
  if (error)
    return res.render("admin/register", { error: error.details[0].message });

  let user = await User.findOne({ email: value.email });
  if (user)
    return res.render("admin/register", {
      error: "User with this email is already registered"
    });

  user = new User({
    firstname: value.firstname,
    lastname: value.lastname,
    email: value.email,
    password: value.password
  });

  try {
    await user.save();
    return res.render("admin/register", {
      success: "User registration successful"
    });
  } catch (err) {
    return res.render("admin/register", {
      error: err
    });
  }
});

router.post("/post", upload.single("postImage"), async (req, res) => {
  if (!req.file) {
    return res.render("admin/post", { error: "No image selected!" });
  }
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  req.body.postImage = `/images/${req.file.filename}`;

  const { value, error } = validatePost(req.body);
  if (error) {
    return res.render("admin/post", { error: error.details[0].message });
  }

  const url = value.title
    .toLowerCase()
    .split(" ")
    .join("-");
  const post = new Post({
    title: value.title,
    category: value.category,
    content: value.body,
    author: value.author,
    image: value.postImage,
    thumbnail: value.postImage,
    url
  });

  try {
    await post.save();
    res.render("admin/post", { success: "post added successfully" });
  } catch (err) {
    return res.render("admin/post", {
      categories,
      error: `failed to save post, ${err}`
    });
  }
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
