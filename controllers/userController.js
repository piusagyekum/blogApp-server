const User = require("../models/user")
const jwt = require("jsonwebtoken")

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res
      .status(200)
      .json({ code: 1, message: "success", details: { email, token } })
  } catch (error) {
    res.status(400).json({ code: 1, message: error.message })
  }
}

const signupUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.signup(email, password)
    const token = createToken(user._id)

    res.status(201).json({
      code: 0,
      message: "User created successfully",
      details: { email, token },
    })
  } catch (error) {
    res.status(400).json({ code: 1, error: error.message })
  }
}

module.exports = { loginUser, signupUser }
