const db = require("../models/index");
const bcrypt = require("bcrypt");
const Users = db.users;

// Done
exports.findAll = (req, res) => {
  Users.find()
    .then((result) => {
      res.send({
        message: "Users fetched successfully!",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Users.",
      });
    });
};

// Done
exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required.",
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
        message: "User fetched successfully!",
        timestamp: new Date().toString(),
        data: {
          name: result.name,
          username: result.username,
          email: result.email,
          image: {
            imageName: result.image.imageName,
            imageLink: result.image.imageLink,
          },
          type: {
            memberType: result.type.accountType.member,
            isNew: result.type.accountType.isNew,
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
        message: err.message || "Some error while retrieving the user.",
      });
    });
};

// Done
exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  Users.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }
      res.send({
        message: "User deleted successfully.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while deleting the user.",
      });
    });
};

// Done
exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required.",
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
        timestamp: new Date().toString(),
        data: {
          name: result.name,
          username: result.username,
          email: result.email,
          image: {
            imageName: result.image.imageName,
            imageLink: result.image.imageLink,
          },
          type: {
            memberType: result.type.accountType.member,
            isNew: result.type.accountType.isNew,
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

// Done
exports.changePassword = (req, res) => {
  const id = req.params.id;
  const oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  if (!id || !oldPassword || !newPassword) {
    return res.status(400).send({
      message: "User ID, Old Password, and New Password are required",
    });
  }

  if (newPassword === oldPassword) {
    return res.status(409).send({
      message: "New Password cannot be the same as Old Password",
    });
  }

  const user = Users.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }

      bcrypt.compare(oldPassword, result.password, (err, result) => {
        if (err) {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while changing the password.",
          });
        } else if (!result) {
          return res.status(401).send({
            message: "Invalid old password",
          });
        } else {
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while changing the password.",
              });
            }

            newPassword = hash;
            Users.findByIdAndUpdate(id, { password: newPassword })
              .then((result) => {
                if (!result) {
                  res.status(404).send({
                    message: "User not found",
                  });
                }
                res.send({
                  message: "User's password updated successfully.",
                  timestamp: new Date().toString(),
                });
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while changing the password.",
                });
              });
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};

exports.changeProfilePicture = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  const user = Users.findById(id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  if (!req.file) {
    return res.status(422).send({
      message: "No file uploaded",
    });
  }

  const imageName = req.file.filename;
  const imageLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/foto/${fileName}`;

  Users.findByIdAndUpdate(id, {
    image: {
      imageName: imageName,
      imageLink: imageLink,
    },
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "User not found",
        });
      }
      res.send({
        message: "User's profile picture updated successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while changing the profile picture.",
      });
    });
};

exports.referal = (req, res) => {
  const referal = req.params.referal;
  const username = req.params.username;

  const day = new Date().getDate() + 1;
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${day}/${month}/${year}`;

  if (!referal || !username) {
    return res.status(400).send({
      message: "Referal code and username are required",
    });
  }

  Users.findOne({ referal: { referalCode: referal } })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Referal code not found",
        });
      }

      Users.findByIdAndUpdate(result.id, {
        referal: {
          referalCode: referal,
          referalCount: result.referal.referalCount + 1,
          referalAccount: result.referal.referalAccount.push({
            username: username,
          }),
        },
      })
        .then((result) => {
          if (!result) {
            res.status(404).send({
              message: "User not found",
            });
          }
          res.send({
            message: "Referal code is successfully used.",
            data: {
              discountPercent: 10,
              expiryDate: date,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while checking the referal.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};
