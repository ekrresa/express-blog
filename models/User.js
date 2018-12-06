const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 60,
    required: true
  },
  lastname: {
    type: String,
    maxlength: 60,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
