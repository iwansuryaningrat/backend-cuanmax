const db = require("../models/index");
const Users = db.users;
const Vouchers = db.vouchers;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

// Belum Selesai
exports.signup = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const admin = req.body.admin;
  const referal = req.body.referal;

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

  // Find referal
  if (referal) {
    const referalUser = Users.findOne({ referal: { referalCode: referal } });
    if (!referalUser) {
      return res.status(409).send({
        message: "Referal Code is not valid",
      });
    } else {
      referalUser.referal.referalCount += 1;
      referalUser.referal.referalAccount.push({ username: username });
      referalUser.save();

      let voucher = Vouchers.findOne({ voucherCode: "CUANMAX2021" });
      if (voucher && voucher.voucherNumber > 0) {
        voucher.voucherNumber -= 1;
        voucher.save();
      }
    }
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
        member: " Basic Member",
        startDate: new Date(),
      },
      isAdmin: admin,
    },
    referal: {
      referalCode: username.toUpperCase(),
      referalLink: ``,
      referalCount: 0,
      referalAccount: [],
    },
    voucher: [
      {
        voucherCode: "CUANMAX2021",
        voucherExpiry: new Date().setDate(new Date().getDate() + 30),
      },
    ],
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
          expiresIn: "1h",
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
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
