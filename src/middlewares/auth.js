const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
      timestamp: new Date().toString(),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({
      message: "Token is not valid",
      timestamp: new Date().toString(),
    });
  }
};

exports.admin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
      timestamp: new Date().toString(),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.admin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({
        message: "You are not an admin",
        timestamp: new Date().toString(),
      });
    }
  } catch (err) {
    res.status(401).send({
      message: "Token is not valid",
      timestamp: new Date().toString(),
    });
  }
};

exports.proMember = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
      timestamp: new Date().toString(),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "Pro Member" || decoded.admin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({
        message:
          "You are not a pro member. Please upgrade member type to pro member",
        timestamp: new Date().toString(),
      });
    }
  } catch (err) {
    res.status(401).send({
      message: "Token is not valid",
      timestamp: new Date().toString(),
    });
  }
};
