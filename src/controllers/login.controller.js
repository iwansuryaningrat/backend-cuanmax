import db from "../models/index.js";
const Users = db.users;
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email && !password) {
    return res.status(400).send({
      message: "Invalid Email or Password!",
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

            return res.status(200).send({
              message: "Login Success",
              timestamp: new Date().toString(),
              token: token,
            });
          } else {
            return res.status(401).send({
              message: "Password incorrect!",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while loging in the User.",
      });
    });
};

export default login;
