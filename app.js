require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const {
  all_blogs,
  find_blog,
  delete_blog,
  add_blog,
  edit_blog,
} = require("./controllers/blogController")

const app = express()
app.use(morgan("dev"))
app.use(express.json())

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

app.get("/blogs", all_blogs)

app.get("/blogs/:id", find_blog)

app.delete("/blogs/:id", delete_blog)

app.post("/blogs/add", add_blog)

app.patch("/blogs/:id", edit_blog)
