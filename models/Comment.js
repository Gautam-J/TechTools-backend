const mongoose = require("mongoose");

// constructor function
const Schema = mongoose.Schema;

// create schema for model
const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: true,
    },
    replies: [
      {
        commentId: {
          type: Schema.Types.ObjectId,
          ref: "comments",
        },
      },
    ],
  },
  { timestamps: true }
);

// create model
const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
