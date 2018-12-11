const { Category } = require("../../models/Category");
const Post = require("../../models/Post");
const { validateCategory, validatePost } = require("../../helpers/validation");
const { upload } = require("../../middleware/images");
const express = require("express");
const router = express.Router();

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
  const { title, category, content, author, image, thumbnail } = value;
  const post = new Post({
    title,
    category,
    content,
    author,
    image,
    thumbnail,
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

router.get("/edit/:postTitle", async (req, res) => {
  const title = req.params.postTitle;
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const post = await Post.findOne({ title });

  res.render("admin/post", {
    post,
    categories
  });
});

module.exports = router;
