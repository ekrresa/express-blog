const express = require("express");
const path = require("path");
require("./db");
const session = require("./session");
const posts = require("./routes/posts");
const index = require("./routes/index");
const dashboard = require("./routes/admin/index");
const cms = require("./routes/admin/cms");
const auth = require("./routes/admin/auth");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use("/", index);
app.use("/blog", posts);
app.use("/admin", dashboard);
app.use("/admin/cms", cms);
app.use("/admin/auth", auth);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
