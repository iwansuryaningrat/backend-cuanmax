import db from "../../models/index.js";
const Users = db.users;
import bcrypt from "bcrypt";

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
    name: "Super Admin",
    username: "superadmin",
    email: "admin@cuanmax.id",
    phone: "088802851811",
    address: "Jl. Admin",
    birthday: "2000-12-14",
    password: encryptedPassword,
    type: {
      accountType: {
        member: "Super Admin",
        isNew: false,
      },
      isAdmin: true,
      isActivated: true,
    },
  },
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
  },
];

// Create users seeder function
const usersSeederFunction = async () => {
  try {
    await Users.deleteMany();
    await Users.insertMany(usersSeeder);
    return "Users Seeder Created";
  } catch (error) {
    return error;
  }
};

// usersSeederFunction();
export default usersSeederFunction;
