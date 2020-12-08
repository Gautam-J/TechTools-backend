const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// @route  POST api/users/register
// @desc   Register new user
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
// @desc   Login user and return jwt
// @access Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  userController.user_login
);

// @route  GET api/users/verify
// @desc   Verify logged in user
// @access Private
router.get("/verify", auth, userController.user_verify);

module.exports = router;
