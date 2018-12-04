const mongoose = require("mongoose");
const Joi = require("joi");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
});

exports.Category = mongoose.model("Category", CategorySchema);
