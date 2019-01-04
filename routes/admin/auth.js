const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { validateUser, validateLogin } = require("../../helpers/validation");
const { requestLog } = require("../../middleware/winston");
const express = require("express");
const router = express.Router();

router.get("/logout", requestLog, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.redirect("/admin");
    }
    res.redirect("/admin/login");
  });
});

router.post("/login", requestLog, async (req, res) => {
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

  req.session.userId = user._id;
  req.session.name = user.firstname;

  res.redirect("/admin");
});

router.post("/register", requestLog, async (req, res) => {
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
      success: "User registration successful, Please login"
    });
  } catch (err) {
    return res.render("admin/register", {
      error: err
    });
  }
});

module.exports = router;
