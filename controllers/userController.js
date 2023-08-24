const User = require("../models/user")

const loginUser = (req, res) => {
  res.json({ Message: "login" })
}

const signupUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.signup(email, password)
    res.status(201).json({ code: 0, message: "User created successfully" })
  } catch (error) {
    res.status(400).json({ code: 1, error: error.message })
  }
}

module.exports = { loginUser, signupUser }
