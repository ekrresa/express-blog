const express = require("express");
const path = require("path");
require("./db");
const posts = require("./routes/posts");
const index = require("./routes/index");
const app = express();

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/blog", posts);

app.listen(3000, () => console.log("listening on port 3000"));
