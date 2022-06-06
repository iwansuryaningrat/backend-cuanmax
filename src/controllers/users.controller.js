const db = require("../models/index");
const Users = db.users;

exports.findAll = (req, res) => {
  Users.find()
    .then((result) => {
      res.send({
        name: result.name,
        username: result.username,
        email: result.email,
        image: result.imageLink,
        type: {
          memberType: result.type.accountType.member,
          adminType: result.type.isAdmin,
        },
        referal: {
          referalCode: result.referal.referalCode,
          referalCount: result.referal.referalCount,
          referalAccount: result.referal.referalAccount,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Users.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Users.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }

      res.send({
        name: result.name,
        username: result.username,
        email: result.email,
        image: result.imageLink,
        type: {
          memberType: result.type.accountType.member,
          adminType: result.type.isAdmin,
        },
        referal: {
          referalCode: result.referal.referalCode,
          referalCount: result.referal.referalCount,
          referalAccount: result.referal.referalAccount,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving the user.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Users.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }
      res.send({ message: "User deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while deleting the user.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Users.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }
      res.send({
        message: "User updated successfully.",
        data: {
          name: result.name,
          username: result.username,
          email: result.email,
          image: result.imageLink,
          type: {
            memberType: result.type.accountType.member,
            adminType: result.type.isAdmin,
          },
          referal: {
            referalCode: result.referal.referalCode,
            referalCount: result.referal.referalCount,
            referalAccount: result.referal.referalAccount,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the user.",
      });
    });
};
