const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: new transports.File({ filename: "exceptions.log" }),
  exitOnError: false
});

const request = createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: new transports.File({ filename: "logfile.log" }),
  exitOnError: false
});

const requestLog = (req, res, next) => {
  request.info(`${req.method} ${req.originalUrl} `);
  next();
};

module.exports = { logger, requestLog };
