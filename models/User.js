const mongoose = require("mongoose");

// constructor function
const Schema = mongoose.Schema;

// create schema for model
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// create model
const User = mongoose.model("user", UserSchema);

module.exports = User;
