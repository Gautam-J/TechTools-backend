const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const user_register = async (req, res) => {
  try {
    console.log("POST request to create new user");
    res.send("New user registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  user_register,
};
