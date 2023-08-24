const Joi = require("joi")

const signupSchema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(6)
    .pattern(/[A-Z]+[0-9]+/)
    .messages({
      "string.pattern.base":
        "password must contain at least one uppercase letter and one symbol",
    }),
})

module.exports = signupSchema
