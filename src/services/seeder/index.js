// MongoDB Connection
import connect from "../db.connect.service.js";
connect();

// Import Seeder
import usersSeederFunction from "./users.seeder.js";

// Run Seeder
const userSeeder = await usersSeederFunction();
console.log(userSeeder);

//   end task
process.exit();
