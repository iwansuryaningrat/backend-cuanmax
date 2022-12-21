// MongoDB Connection
import connect from "../db.connect.service.js";
connect();

// Import Seeder
import usersSeederFunction from "./users.seeder.js";
import deleteAll from "./delete.seeder.js";

// Run Seeder
// const userSeeder = await usersSeederFunction();
// console.log(userSeeder);
const deleteAllSeeder = await deleteAll();
console.log(deleteAllSeeder);

//   end task
process.exit();
