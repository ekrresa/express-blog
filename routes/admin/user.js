const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { validateUser, validateLogin } = require("../../helpers/validation");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { value, error } = validateLogin(req.body);
  if (error)
    return res.render("admin/login", {
      error: error.details[0].message
    });

  let user = await User.findOne({ email: value.email });
  if (!user)
    return res.render("admin/login", {
      error: "Invalid email/password"
    });

  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) {
    return res.render("admin/login", { error: "Invalid email/password" });
  }

  console.log("login successful");
});

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

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

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

module.exports = router;
