// MongoDB Connection
import connect from "../db.connect.service.js";
connect();

// Import Seeder
import usersSeederFunction from "./users.seeder.js";

// Run Seeder
usersSeederFunction();
