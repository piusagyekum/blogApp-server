const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const Joi = require("joi")
const signupSchema = require("../util/signupValidation")

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

//creating signup static method
userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error("User already exists")
  }

  const userValidation = signupSchema.validate({ email, password })

  if (userValidation.error) {
    throw Error(userValidation.error.details[0].message.replaceAll('"', ""))
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

//CREATING LOG IN STATIC METHOD

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("Email and Password are required")

  const user = await this.findOne({ email })

  if (!user) throw Error("Email not found")

  const match = await bcrypt.compare(password, user.password)

  if(!match) throw Error("Incorrect password")

  return user
}

const User = mongoose.model("User", userSchema)

module.exports = User
