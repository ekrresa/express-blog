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
  published: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() }
});

PostSchema.virtual("date").get(function() {
  let year = moment(this.published).format("YYYY");
  let month = moment(this.published).format("MMMM");
  let day = moment(this.published).format("DD");
  return `${month} ${day}, ${year}`;
});

module.exports = mongoose.model("Post", PostSchema);
