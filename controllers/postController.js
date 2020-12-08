const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");

const post_create = async (req, res) => {
  // check for errors in request body according to check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, link } = req.body;

  try {
    // check for duplicates
    const duplicateTitlePost = await Post.findOne({ title });
    if (duplicateTitlePost) {
      return res.status(400).json({
        errors: [{ msg: "A post with the same title exists" }],
        post: duplicateTitlePost,
      });
    }

    const duplicateLinkPost = await Post.findOne({ link });
    if (duplicateLinkPost) {
      return res.status(400).json({
        errors: [{ msg: "A post with the same link exists" }],
        post: duplicateLinkPost,
      });
    }

    // create new Post instance
    const newPost = new Post({
      title,
      link,
      contentType: req.body.contentType,
      source: req.body.source,
      description: req.body.description,
      userId: req.user.id,
    });

    // save instance to MongoDB
    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const post_index = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const post_details = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check for 404
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    // check for 404
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }
  }
};

module.exports = {
  post_create,
  post_index,
  post_details,
};
