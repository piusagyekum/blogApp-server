const Joi = require("joi")

const signupSchema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6)
    .pattern(/[a-z]+/)
    .pattern(/[A-Z]+/)
    .pattern(/[\d]+/)
    .pattern(/[^\w\d]+/)
    .messages({
      "string.pattern.base":
        "password is not strong enough",
    }),
})

module.exports = signupSchema
