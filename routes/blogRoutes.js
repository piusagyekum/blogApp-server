const express = require('express')
const {
  all_blogs,
  find_blog,
  delete_blog,
  add_blog,
  edit_blog,
} = require("../controllers/blogController")

const router = express.Router()

router.get("/", all_blogs)

router.get("/:id", find_blog)

router.delete("/:id", delete_blog)

router.post("/add", add_blog)

router.patch("/:id", edit_blog)

module.exports = router;