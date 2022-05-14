const db = require("../models/index");
const Profiles = db.profiles;

// Belum Selesai
exports.create = (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const admin = req.body.admin;
  const referal = req.body.referal;

  if (!name || !username || !email || !password) {
    return res.status(400).send({
      message: "Name, username, email and password are required.",
    });
  }

  Profiles.findOne({ referal: { referalCode: referal } }, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "Error while retrieving profiles.",
      });
    }
    if (result) {
      Profiles.findOneAndUpdate(result.id);
    }
  });
};
