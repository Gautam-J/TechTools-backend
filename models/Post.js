const mongoose = require("mongoose");

// constructor function
const Schema = mongoose.Schema;

// create schema for model
const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now,
    },
    contentType: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: "users",
            },
            text: {
              type: String,
              required: true,
            },
            date: {
              type: String,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// create model
const Post = mongoose.model("post", PostSchema);

module.exports = Post;
