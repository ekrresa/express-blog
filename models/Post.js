const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  author: String,
  thumbnail: String,
  category: String,
  published: String,
  updated: String
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
