const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
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

exports.admin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.admin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({ message: "You are not an admin" });
    }
  } catch (err) {
    res.status(401).send({ message: "Token is not valid" });
  }
};

exports.proMember = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "Pro Member") {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({ message: "You are not a pro member" });
    }
  } catch (err) {
    res.status(401).send({ message: "Token is not valid" });
  }
};
