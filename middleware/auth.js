const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // check for token in header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // set req.user as the verified login user
    req.user = decoded.user;

    // go to the next route
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
