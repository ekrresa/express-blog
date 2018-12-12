const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const {
  NODE_ENV = "development",
  SESS_NAME = "sid",
  SESS_SECRET = "!my/secret/hiding/place!",
  SESS_LIFETIME = 1000 * 60 * 60
} = process.env;

const store = new MongoDBStore(
  {
    uri: process.env.MONGODB_URI || "mongodb://localhost/agricblog",
    collection: "mySessions"
  },
  function(error) {
    if (error) {
      console.log(error);
    }
  }
);

module.exports = session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  store,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: NODE_ENV === "production"
  }
});
