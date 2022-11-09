import db from "../../models/index.js";
const Users = db.users;
import "dotenv/config";
import bcrypt from "bcrypt";

// Sign Up (DONE)
const signup = async (req, res) => {
  const { name, email, username } = req.body;
  let password = req.body.password;
  const admin = req.body.admin ? req.body.admin : false;

  if (!name || !username || !email || !password) {
    return res.status(400).send({
      message: "Name, username, email, and password are required.",
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
  const encryptedPassword = await bcrypt.hash(password, salt);

  var member = admin ? "Admin" : "Basic Member";

  // Create new user
  const newUser = new Users({
    name: name,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    type: {
      accountType: {
        member: member,
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
      res.status(200).send({
        message: "User created successfully. Please Login to continue.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while Signing up the User.",
      });
    });
};

export default signup;
