import db from "../models/index.js";
const Users = db.users;
import bcrypt from "bcrypt";
import adminCheck from "../services/admincheck.service.js";

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
        const { _id, name, username, email, phone, address, birthday, type } =
          item;

        birthday = new Date(birthday).toString();

        return {
          id: _id,
          name,
          username,
          email,
          phone,
          address,
          birthday,
          memberType: type.accountType.member,
          subscription: {
            startAt: new Date(type.accountType.subscription.startAt).toString(),
            expiredAt: new Date(
              type.accountType.subscription.expiredAt
            ).toString(),
          },
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
        birthday,
        image,
        type,
        referal,
      } = result;

      if (type.accountType.subscription.expiredAt == 0) {
        type.accountType.subscription.expiredAt = null;
      } else {
        type.accountType.subscription.expiredAt = new Date(
          type.accountType.subscription.expiredAt
        ).toString();
      }

      const data = {
        id: _id,
        name,
        username,
        email,
        phone,
        address,
        birthday: new Date(birthday).toString(),
        image,
        type: {
          isAdmin: type.isAdmin,
          isActivated: type.isActivated,
          accountType: {
            member: type.accountType.member,
            subscription: {
              startat: new Date(
                type.accountType.subscription.startAt
              ).toString(),
              expiredAt: type.accountType.subscription.expiredAt,
            },
            isNew: type.accountType.isNew,
          },
        },
        referal,
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

// Delete a user with the specified id in the request - Admin Only (Done)
const deleteUSer = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  // If selected user is admin, then don't delete
  const admincheck = await adminCheck(id);

  if (admincheck) {
    return res.status(405).send({
      message: "Admin user can't be deleted!",
    });
  }

  await Users.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      res.send({
        message: "User deleted successfully!",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deleting the user.",
      });
    });
};

// Update a user by the id in the request (Done)
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
        data: {
          name: result.name,
          username: result.username,
          email: result.email,
          phone: result.phone,
          address: result.address,
          birthday: new Date(result.birthday).toString(),
          image: result.image,
          referal: result.referal,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the user.",
      });
    });
};

// Change password (Done)
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
      message: "New Password cannot be the same as Old Password!",
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

// Change user's image (Done)
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
        data: {
          image: result.image,
        },
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

// Create Referal Code (Done)
const createReferalCode = (req, res) => {
  const { id } = req.params;
  var { referalCode } = req.body;

  if (!id) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  if (!referalCode)
    // Generate random referal code with 8 characters
    referalCode = Math.random().toString(36).substring(2, 10);

  if (referalCode.length > 8) {
    return res.status(400).send({
      message: "Referal Code must be 8 characters or less",
    });
  }

  const user = Users.findOne({ referal: referalCode })
    .then((result) => {
      if (result) {
        return res.status(409).send({
          message: "Referal Code already exists",
        });
      }

      Users.findByIdAndUpdate(id, { referal: { referalCode } }, { new: true })
        .then((result) => {
          if (!result) {
            return res.status(404).send({
              message: "User not found",
            });
          }

          res.send({
            message: "User's referal code created successfully.",
            data: {
              referal: result.referal,
            },
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the referal code.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the referal code.",
      });
    });
};

// Change Pro Member into Basic Member While Pro Member's Subscription is Expired (Done - Not Tested)
const changeProMemberToBasicMember = async (req, res) => {
  const date = new Date().getTime();

  await Users.updateMany(
    { "type.accountType.subscription.expiredAt": { $lt: date } }, // Find all users whose subscription is expired
    {
      $set: {
        "type.accountType.type": "Basic Member", // Change their account type to Basic Member
        "type.accountType.subscription": {
          // Set their subscription to null
          expiredAt: null,
        },
      },
    }
  )
    .then((result) => {
      if (!result) {
        return res.status(200).send({
          message: "No user updated",
        });
      }

      const count = result.nModified;

      res.send({
        message: `${count} user(s) changed from Pro Member to Basic Member.`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while changing Pro Member to Basic Member.",
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
  createReferalCode,
  changeProMemberToBasicMember,
};
