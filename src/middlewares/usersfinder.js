import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import db from "../models/index.js";
const Users = db.users;

// User Finder Middleware
const userFinder = (req, res, next) => {
  const token = req.header("x-auth-token");
  const id = req.params.id;

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id === id) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(403).send({
        message: "You are not authorized to do this action!",
      });
    }
  } catch (err) {
    return res.status(401).send({
      message: "Token is not valid",
    });
  }
};

// Verify User that available in database
const verifyUser = (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const id = decoded.id;
    Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found!",
          });
        } else {
          req.user = decoded.user;
          next();
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving User with id=" + id,
        });
      });
  } catch (err) {
    return res.status(401).send({
      message: err.message || "Token is not valid",
    });
  }
};

export { userFinder, verifyUser };
