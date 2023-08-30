const Blog = require("../models/blog")
const mongoose = require("mongoose")

const all_blogs = (req, res) => {
  const user_id = req.user._id
  Blog.find({user_id})
    .sort({ createdAt: -1 })
    .then(blogs => {
      res.json({ code: 0, blogs })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Could not retrive blogs" })
    })
}

const find_blog = (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      res.json({ code: 0, blog })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

const delete_blog = (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ code: 1, Message: "An invalid Id was provided" })
  }

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ code: 0, Message: "The blog was deleted successfully",result })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

const add_blog = (req, res) => {
  const user_id = req.user._id
  const blog = new Blog({...req.body,user_id})

  blog
    .save()
    .then(result => {
      res.json({ code: 0, Message: "Blog was added successfully", result })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not added" })
    })
}

const edit_blog = (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ code: 0, Message: "Blog was updated successfully" })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

module.exports = {
  all_blogs,
  find_blog,
  delete_blog,
  add_blog,
  edit_blog,
}
