// Load .env file

import "dotenv/config";

// MongoDB configuration
const dbConfig = {
  url: process.env.MONGODB_URI,
};

export default dbConfig;
