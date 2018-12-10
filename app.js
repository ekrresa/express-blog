const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
require("./db");
const posts = require("./routes/posts");
const index = require("./routes/index");
const admin = require("./routes/admin/admin");
const cms = require("./routes/admin/index");
const user = require("./routes/admin/user");
const app = express();

const {
  PORT = 3000,
  NODE_ENV = "development",
  SESS_NAME = "sid",
  SESS_SECRET = "!my/secret/hiding/place!",
  SESS_LIFETIME = 1000 * 60 * 60
} = process.env;

app.set("view engine", "pug");

const store = new MongoDBStore(
  {
    uri: "mongodb://localhost/agricblog",
    collection: "mySessions"
  },
  function(error) {
    if (error) {
      console.log(error);
    }
  }
);

app.use(
  session({
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
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use("/", index);
app.use("/blog", posts);
app.use("/admin", admin);
app.use("/admin", cms);
app.use("/admin", user);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
