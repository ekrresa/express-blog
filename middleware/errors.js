const { logger } = require("./winston");

module.exports = function(err, req, res, next) {
  console.log(err);

  logger.error(err.message, err);
  res.status(500).render("error");
};
