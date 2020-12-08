const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

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

    res.status(500).send("Server error");
  }
};

const post_delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check for 404
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    // remove from MongoDB
    await post.remove();

    res.json({ success: [{ msg: "Post removed" }] });
  } catch (err) {
    console.log(err.message);

    // check for 404
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    res.status(500).send("Server error");
  }
};

const post_like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post has already been liked
    if (
      post.likes.filter((like) => like.userId.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ errors: [{ msg: "Post already liked" }] });
    }

    // add userId to beginning of likes array
    post.likes.unshift({ userId: req.user.id });

    // save updated Post instance to MongoDB
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const post_unlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post has already been liked
    if (
      post.likes.filter((like) => like.userId.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Post has not yet been liked" }] });
    }

    // get index of userId to be removed
    const removeIndex = post.likes.map((like) =>
      like.userId.toString().indexOf(req.user.id)
    );

    // remove element in removeIndex
    post.likes.splice(removeIndex, 1);

    // save updated Post instance to MongoDB
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const post_comment = async (req, res) => {
  // check for errors in request body according to check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    // create new instance of Comment
    const newComment = new Comment({
      text: req.body.text,
      userId: req.user.id,
    });

    // save instance to MongoDB
    const comment = await newComment.save();

    // update likes array in Post
    post.comments.unshift({ commentId: comment._id });

    // save updated Post to MongoDB
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  post_create,
  post_index,
  post_details,
  post_delete,
  post_like,
  post_unlike,
  post_comment,
};
