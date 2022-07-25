const db = require("../models/index");
const Users = db.users;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email && !password) {
    res.status(400).send({
      message: "Invalid Email or Password!",
    });
  }

  Users.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: "User not found!",
        });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
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
                expiresIn: "3h",
              }
            );

            res.setHeader("Content-Type", "Application/json");

            res.status(200).send({
              message: "Login Success",
              timestamp: new Date().toString(),
              token: token,
            });
          } else {
            res.status(401).send({
              message: "Password incorrect!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while loging in the User.",
      });
    });
};
