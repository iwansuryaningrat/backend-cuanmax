import db from "../../src/models/index.js";
const Users = db.users;
import mongoose from "mongoose";
const { Schema } = mongoose;

const test = async (id) => {
  const response = await Users.findById(id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });

  const user = new Users({
    _id: Schema.Types.ObjectId,
    username: "test",
    email: "example@mail.com",
    password: "password",
  });

  const result = {
    response,
    user,
  };

  return result;
};

// const result = test();
// console.log(result);

test("636fec47ed082a65c9e094be").then((result) => {
  console.log(result);
});
