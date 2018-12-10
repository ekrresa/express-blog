const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
});

exports.Category = mongoose.model("Category", CategorySchema);
