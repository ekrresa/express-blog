const mongoose = require("mongoose");
const winston = require("winston");

module.exports = mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/agricblog")
  .then(() => winston.info("Connected to MongoDB..."))
  .catch(err => winston.error("Could not connect to MongoDb", err));
