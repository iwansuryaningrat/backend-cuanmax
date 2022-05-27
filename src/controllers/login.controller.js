const db = require("../models/index");
const Users = db.users;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
