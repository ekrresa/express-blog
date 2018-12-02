const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const posts = require("./routes/posts");
const index = require("./routes/index");
const app = express();

app.set("view engine", "pug");

mongoose
  .connect("mongodb://localhost/agricblog")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDb", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/posts", posts);

app.listen(3000, () => console.log("listening on port 3000"));
