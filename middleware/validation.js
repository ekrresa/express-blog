const Joi = require("joi");

module.exports = function validateCategory(body) {
  const schema = {
    category: Joi.string()
      .min(3)
      .max(50)
      .required(),
    submit: Joi.any().strip()
  };

  return Joi.validate(body, schema, { abortEarly: false });
};
