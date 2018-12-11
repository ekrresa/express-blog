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

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const categories = await Category.find()
    .sort("name")
    .select("name -_id");
  const post = await Post.findOne({ _id: id });

  res.render("admin/post", {
    post,
    categories
  });
});

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, category, body, author } = req.body;
  const url = title
    .toLowerCase()
    .split(" ")
    .join("-");
  const post = await Post.update(
    { _id: id },
    {
      $set: {
        title,
        category,
        content: body,
        author,
        url,
        updated: Date.now()
      }
    }
  );

  res.redirect("/admin");
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Post.deleteOne({ _id: id });
  res.redirect("/admin");
});

module.exports = router;
