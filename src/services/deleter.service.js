// MongoDB Connection
import connect from "./db.connect.service.js";
connect();
import db from "../models/index.js";
const LiveclassTransactions = db.liveclassTransactions;
const deleter = async () => {
  try {
    await LiveclassTransactions.deleteMany({});
    return true;
  } catch (error) {
    return false;
  }
};

const deleteData = async () => {
  const isDeleted = await deleter();
  if (isDeleted) {
    return "Deleted";
  } else {
    return "Not Deleted";
  }
};

console.log(await deleteData());
process.exit(0);
