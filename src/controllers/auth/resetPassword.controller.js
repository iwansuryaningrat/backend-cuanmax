import db from "../../models/index.js";
const Users = db.users;
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

// Reset Password Controller Function (DONE)
const resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Validate request
  if (!oldPassword && !newPassword) {
    return res.status(400).send({
      message: "Old Password and New Password can't be empty!",
    });
  }

  if (oldPassword === newPassword) {
    return res.status(400).send({
      message: "Old Password and New Password can't be the same!",
    });
  }

  await Users.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found!",
        });
      } else {
        bcrypt.compare(oldPassword, user.password, (err, result) => {
          if (result) {
            bcrypt.hash(newPassword, 10, (err, hash) => {
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
                    const token = jwt.sign(
                      {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        admin: user.type.isAdmin,
                        role: user.type.accountType.member,
                      },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: "12h",
                      }
                    );

                    return res.status(200).send({
                      message: "Password has been changed!",
                      token,
                    });
                  }
                });
              }
            });
          } else {
            return res.status(401).send({
              message: "Old Password incorrect!",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error when updating password!",
      });
    });
};

// Request Reset Password Link Controller Function (Mail feature not done yet)
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate request
  if (!email) {
    return res.status(400).send({
      message: "Email can't be empty!",
    });
  }

  await Users.findOne({
    email,
  })
    .then((user) => {
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
            admin: user.type.isAdmin,
            role: user.type.accountType.member,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "10m",
          }
        );

        // Send email to user
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Reset Password",
          html: `<h1>Reset Password</h1>
                    <p>Click the link below to reset your password</p>
                    <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send({
              message: "Error when sending email!",
            });
          } else {
            return res.status(200).send({
              message: "Email sent!",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error when sending email!",
      });
    });
};

// Reset Password With Token Controller Function (Not done yet - need to test it)
const resetPasswordWithToken = async (req, res) => {
  const { password } = req.body;

  // Validate request
  if (!password) {
    return res.status(400).send({
      message: "Password can't be empty!",
    });
  }

  const token = req.params.token;

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

export { resetPassword, forgotPassword, resetPasswordWithToken };
