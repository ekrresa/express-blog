const express = require("express");
const path = require("path");
require("./db");
const posts = require("./routes/posts");
const index = require("./routes/index");
const category = require("./routes/admin/category");
const admin = require("./routes/admin/index");
const app = express();

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/blog", posts);
app.use("/admin", admin);
app.use("/admin", category);

app.listen(3000, () => console.log("listening on port 3000"));
