require("express-async-errors");
const winston = require("winston");
const { requestLog } = require("./middleware/winston");
const error = require("./middleware/errors");
const path = require("path");
require("./db");
const session = require("./session");
const posts = require("./routes/posts");
const index = require("./routes/index");
const dashboard = require("./routes/admin/index");
const cms = require("./routes/admin/cms");
const auth = require("./routes/admin/auth");
const aside = require("./routes/aside");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
winston.configure({
  transports: [new winston.transports.Console()]
});

app.set("view engine", "pug");

app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use("/", requestLog, index);
app.use("/blog", requestLog, posts);
app.use("/aside", aside);
app.use("/admin", requestLog, dashboard);
app.use("/admin/cms", requestLog, cms);
app.use("/admin/auth", requestLog, auth);

app.use(error);

app.listen(PORT, () => winston.info(`listening on port ${PORT}`));
