import db from "../models/index.js";
const Users = db.users;
import bcrypt from "bcrypt";

// Fetch all users - Admin Only (Done)
const findAll = (req, res) => {
  const { admin, basic, pro } = req.query;

  var condition = {};

  if (admin) {
    condition = { "type.isAdmin": true };
  } else if (basic) {
    condition = { "type.accountType.member": "Basic Member" };
  } else if (pro) {
    condition = { "type.accountType.member": "Pro Member" };
  }

  Users.find(condition)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "No users found!",
        });
      }

      const data = result.map((item) => {
        const { _id, name, username, email, phone, address, type } = item;
        return {
          id: _id,
          name,
          username,
          email,
          phone,
          address,
          memberType: type.accountType.member,
          startDate: type.accountType.startDate.toString(),
          isNew: type.accountType.isNew,
          adminType: type.isAdmin,
          isActivated: type.isActivated,
        };
      });

      res.status(200).send({
        message: "Users fetched successfully!",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while fetching the Users.",
      });
    });
};

// Find a single user with an id (Done)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  Users.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "User not found!",
        });
      }

      const {
        _id,
        name,
        username,
        email,
        phone,
        address,
        gender,
        image,
        type,
        referal,
      } = result;

      const data = {
        id: _id,
        name,
        username,
        email,
        phone,
        address,
        gender,
        image: image.imageLink,
        type: {
          memberType: type.accountType.member,
          startDate: type.accountType.startDate.toString(),
          endDate: type.accountType.endDate
            ? type.accountType.endDate.toString()
            : null,
          isNew: type.accountType.isNew,
          isAdmin: type.isAdmin,
          isActivated: type.isActivated,
        },
        referal: {
          referalCode: referal.referalCode,
          referalCount: referal.referalCount,
          referalAccount: referal.referalAccount,
        },
      };

      res.status(200).send({
        message: "User fetched successfully!",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving the user!",
      });
    });
};

// Delete a user with the specified id in the request - Admin Only
const deleteUSer = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  Users.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.send({
        message: "User deleted successfully.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deleting the user.",
      });
    });
};

// Update a user by the id in the request
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required.",
    });
  }

  Users.findByIdAndUpdate(id, req.body, { new: true })
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

// Change password
const changePassword = (req, res) => {
  const { id } = req.params;
  const { oldPassword } = req.body;
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
        return res.status(404).send({
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
                  return res.status(404).send({
                    message: "User not found",
                  });
                }
                res.send({
                  message: "User's password updated successfully.",
                  timestamp: new Date().toString(),
                });
              })
              .catch((err) => {
                return res.status(500).send({
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
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};

// Change user's image
const changeProfilePicture = (req, res) => {
  const { id } = req.params;

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
  )}/assets/images/${imageName}`;

  Users.findByIdAndUpdate(
    id,
    {
      image: {
        imageName: imageName,
        imageLink: imageLink,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.send({
        message: "User's profile picture updated successfully.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while changing the profile picture.",
      });
    });
};

export {
  findAll,
  findOne,
  deleteUSer,
  update,
  changePassword,
  changeProfilePicture,
};
