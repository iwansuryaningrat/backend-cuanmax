import db from "../../src/models/index.js";
const Users = db.users;

const test = async () => {
  const response = await Users.find({ "type.accountType.member": "basic" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

const test2 = await test();

console.log(test2);
