import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

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

export default userFinder;
