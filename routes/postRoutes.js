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

// @route  GET api/posts/:id
// @desc   Get post by Id
// @access Public
router.get("/:id", postController.post_details);

// @route  DELETE api/posts/:id
// @desc   Delete post by Id
// @access Private
router.delete("/:id", auth, postController.post_delete);

// @route  PUT api/posts/like/:id
// @desc   Like post by Id
// @access Private
router.put("/like/:id", auth, postController.post_like);

// @route  PUT api/posts/unlike/:id
// @desc   Unlike post by Id
// @access Private
router.put("/unlike/:id", auth, postController.post_unlike);

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  postController.post_comment
);

// @route  DELETE api/posts/uncomment/:id/:commentId
// @desc   Delete comment by Id
// @access Private

module.exports = router;
