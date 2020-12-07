const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

// @route  POST api/users/register
// @desc   Register/create new user
// @access Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  userController.user_register
);

module.exports = router;
