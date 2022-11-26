import db from "../../models/index.js";
const Users = db.users;
import bcrypt from "bcrypt";

// MongoDB Connection
import connect from "../db.connect.service.js";
connect();

// Declare ObjectId type for mongoose
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const password = "Undip.jaya123";
// generate salt to hash password
const salt = await bcrypt.genSalt(10);
// now we set user password to hashed password
const encryptedPassword = await bcrypt.hash(password, salt);

const usersSeeder = [
  {
    name: "Admin",
    username: "admin",
    email: "iwanadmin@gmail.com",
    phone: "081234567890",
    address: "Jl. Admin",
    birthday: "1990-01-01",
    password: encryptedPassword,
    type: {
      accountType: {
        member: "Admin",
        isNew: false,
      },
      isAdmin: true,
      isActivated: true,
    },
    referal: ObjectId("5f9f1b9b9c9d2b0017a5b0b1"),
  },
  {
    name: "Basic Member",
    username: "basicmember",
    email: "iwanbasic@gmail.com",
    phone: "081234567890",
    address: "Jl. Admin",
    birthday: "1990-01-01",
    password: encryptedPassword,
    type: {
      accountType: {
        member: "Basic Member",
        subscription: {
          startAt: new Date().getTime(),
        },
        isNew: false,
      },
      isAdmin: false,
      isActivated: true,
    },
    referal: ObjectId("5f9f1b9b9c9d2b0017a5b0b1"),
  },
  {
    name: "Pro Member",
    username: "promember",
    email: "iwanpro@gmail.com",
    phone: "081234567890",
    address: "Jl. Admin",
    birthday: "1990-01-01",
    password: encryptedPassword,
    type: {
      accountType: {
        member: "Pro Member",
        subscription: {
          startAt: new Date().getTime(),
          expiredAt: new Date().getTime() + 2592000000,
        },
        isNew: false,
      },
      isAdmin: false,
      isActivated: true,
    },
    referal: ObjectId("5f9f1b9b9c9d2b0017a5b0b1"),
  },
];

// Create users seeder function
const usersSeederFunction = async () => {
  try {
    await Users.deleteMany();
    await Users.insertMany(usersSeeder);
    console.log("Users Seeder Created");
    //   end task
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

usersSeederFunction();
