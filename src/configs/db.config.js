// Load .env file
require("dotenv").config();

// MongoDB configuration
module.exports = {
  url: process.env.MONGODB_URI,
};
