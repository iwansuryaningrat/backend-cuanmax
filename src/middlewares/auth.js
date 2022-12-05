import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

// Basic Membership Middleware (Done)
const login = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Token is expired",
      });
    } else {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token is expired",
        });
      } else {
        return res.status(401).send({
          message: "Token is not valid",
        });
      }
    }
  }
};

// Admin Middleware (Done)
const admin = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.admin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Token is expired",
      });
    } else {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token is expired",
        });
      } else {
        return res.status(401).send({
          message: "Token is not valid",
        });
      }
    }
  }
};

// Pro Membership Middleware (Done)
const proMember = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
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
      });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Token is expired",
      });
    } else {
      return res.status(401).send({
        message: "Token is not valid",
      });
    }
  }
};

// Super Admin Middleware (Done)
const superAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "Super Admin" && decoded.admin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({
        message: "Require Super Admin Role!",
      });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        message: "Token is expired",
      });
    } else {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token is expired",
        });
      } else {
        return res.status(401).send({
          message: "Token is not valid",
        });
      }
    }
  }
};

export { login, admin, proMember, superAdmin };
