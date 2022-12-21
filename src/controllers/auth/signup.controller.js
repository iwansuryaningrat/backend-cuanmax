import db from "../../models/index.js";
const Users = db.users;
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupMailer } from "../../services/mailer.service.js";

// Sign Up (DONE)
const signup = async (req, res) => {
  const { name, email, username } = req.body;
  let password = req.body.password;
  const admin = req.body.admin === true ? true : false;

  if (!name || !username || !email || !password) {
    return res.status(400).send({
      message: "Name, username, email, and password are required.",
    });
  }

  // Validate email
  const oldUser = await Users.findOne({ email });
  if (oldUser) {
    return res.status(409).send({
      message: "User Already Exist. Please Login",
    });
  }

  //Encrypt user password
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const encryptedPassword = await bcrypt.hash(password, salt);

  var member = admin === true ? "Admin" : "Basic Member";

  // Create new user
  const newUser = new Users({
    name: name,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    type: {
      accountType: {
        member: member,
        subscription: {
          startAt: new Date().getTime(),
        },
        isNew: true,
      },
      isAdmin: admin,
    },
  });

  // Save new user
  const result = await newUser
    .save()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while Signing up the User.",
      });
    });

  if (result) {
    // Generate token
    const token = jwt.sign(
      {
        id: result._id,
        name: result.name,
        username: result.username,
        email: result.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    // Send email
    const response = await signupMailer(result.email, token);

    if (response == "Email sent") {
      return res.status(200).send({
        message: "User registered successfully! Please check your email.",
      });
    } else {
      return res.status(500).send({
        message: "Failed to send email.",
      });
    }
  }
};

export default signup;
