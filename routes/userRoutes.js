const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

// @route  POST api/users/register
// @desc   Register or create new user
// @access Public
router.post(
  "/register",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  userController.user_register
);

// @route  POST api/users/login
// @desc   Register or create new user
// @access Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  userController.user_login
);

module.exports = router;
