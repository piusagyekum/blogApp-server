const Joi = require("joi")

const signupSchema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/)
    .messages({
      "string.pattern.base":
        "password is not strong enough",
    }),
})

module.exports = signupSchema
