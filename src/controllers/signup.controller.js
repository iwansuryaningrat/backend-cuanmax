const db = require("../models/index");
const Users = db.users;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

// Belum Selesai
exports.signup = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const admin = req.body.admin ? req.body.admin : false;

  if (!name || !username || !email || !password) {
    return res.status(400).send({
      message: "Name, username, email and password are required.",
    });
  }

  // Validate email
  const oldUser = await Users.findOne({ email: email });
  if (oldUser) {
    return res.status(409).send({
      message: "User Already Exist. Please Login",
    });
  }

  //Encrypt user password
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  encryptedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new Users({
    name: name,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    type: {
      accountType: {
        member: "Basic Member",
        startDate: new Date().toString(),
        isNew: true,
      },
      isAdmin: admin,
    },
    referal: {
      referalCode: username.toUpperCase(),
      referalCount: 0,
      referalAccount: [],
      referalAmount: 0,
    },
  });

  // Save new user
  newUser
    .save()
    .then((data) => {
      // Create token
      const token = jwt.sign(
        {
          user: {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            admin: newUser.type.isAdmin,
            role: newUser.type.accountType.member,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      res.send({
        message: "User created successfully",
        token: token,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Signing up the User.",
      });
    });
};
