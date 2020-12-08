const express = require("express");
const { check } = require("express-validator");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = express.Router();

// @route  POST api/posts/create
// @desc   Create a new post
// @access Private
router.post(
  "/create",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("link", "A valid link is required").isURL(),
      check("contentType", "Content type is required").not().isEmpty(),
      check("source", "A valid source is required").not().isEmpty(),
    ],
  ],
  postController.post_create
);

// @route  GET api/posts/index
// @desc   Get all posts
// @access Public
router.get("/index", postController.post_index);

// @route  GET api/posts/index
// @desc   Get all posts
// @access Public
router.get("/:id", postController.post_details);

module.exports = router;
