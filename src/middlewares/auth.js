const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ message: "Token is not valid" });
  }
};
