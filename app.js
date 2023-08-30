require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const blogRouter = require("./routes/blogRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/blogs", blogRouter)

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT)
    })
  })
  .catch(() => {
    console.log("Could not connect to the database")
  })
