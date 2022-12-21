import db from "../../models/index.js";
const Users = db.users;
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { forgotPasswordMailer } from "../../services/mailer.service.js";

// Request Reset Password Link Controller Function (DONE)
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate request
  if (!email) {
    return res.status(400).send({
      message: "Email can't be empty!",
    });
  }

  const user = await Users.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        return false;
      } else {
        return user;
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error when finding user!",
      });
    });

  if (!user) {
    return res.status(404).send({
      message: "User not found!",
    });
  } else {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m", // 10 minutes
      }
    );

    // Send email to user with reset password link
    const response = await forgotPasswordMailer(user.email, token);

    if (response === "Email sent") {
      return res.status(200).send({
        message: "Email has been sent!",
      });
    } else {
      return res.status(500).send({
        message: "Error when sending email!",
      });
    }
  }
};

// Reset Password With Token Controller Function (DONE)
const resetPasswordWithToken = async (req, res) => {
  const { password } = req.body;

  // Validate request
  if (!password) {
    return res.status(400).send({
      message: "Password can't be empty!",
    });
  }

  const token = req.params.token;

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid Token!",
      });
    } else {
      Users.findOne({
        email: decoded.email,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: "User not found!",
            });
          } else {
            bcrypt.compare(user.password, password, (err, result) => {
              if (result) {
                return res.status(400).send({
                  message: "Password can't be the same!",
                });
              }

              bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).send({
                    message: "Error when hashing password!",
                  });
                } else {
                  user.password = hash;
                  user.save((err, user) => {
                    if (err) {
                      return res.status(500).send({
                        message: "Error when updating password!",
                      });
                    } else {
                      return res.status(200).send({
                        message: "Password has been changed, please login!",
                      });
                    }
                  });
                }
              });
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Error when updating password!",
          });
        });
    }
  });
};

export { forgotPassword, resetPasswordWithToken };
