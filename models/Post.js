const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  author: String,
  thumbnail: String,
  category: String,
  url: String,
  published: Date,
  updated: Date
});

PostSchema.virtual("timeline").get(function() {
  let year = moment(this.published).format("YYYY");
  let month = moment(this.published).format("MMMM");
  let day = moment(this.published).format("DD");
  return `Posted in ${
    this.category
  } by ${this.author} on ${month} ${day}, ${year}`;
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
