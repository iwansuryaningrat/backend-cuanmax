import db from "../models/index.js";
const Users = db.users;

const adminCheck = async (id) => {
  const response = await Users.findById(id)
    .then((data) => {
      if (data.type.isAdmin) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return error.message;
    });

  return response;
};

export default adminCheck;
