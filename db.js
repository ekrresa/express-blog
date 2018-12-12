const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/agricblog")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDb", err));
