const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports.isLoggedIn = isLoggedIn;
