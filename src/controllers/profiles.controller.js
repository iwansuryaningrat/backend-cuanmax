const db = require("../models/index");
const Profiles = db.profiles;

exports.findAll = (req, res) => {
  Profiles.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving profiles.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Profiles.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Profile not found",
        });
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving the profile.",
      });
    });
};

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

// Need Testing
exports.update = (req, res) => {
  const id = req.params.id;

  Profiles.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Profile not found",
        });
      }
      res.send({ message: "Profile updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while updating the profile.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Profiles.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Profile not found",
        });
      }
      res.send({ message: "Profile deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while deleting the profile.",
      });
    });
};
