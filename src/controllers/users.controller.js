import db from "../models/index.js";
const Users = db.users;
const Referrals = db.referrals;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminCheck from "./function/admincheck.function.js";
import dataCounter from "./function/dataCounter.function.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Fetch all users - Admin Only (need to be updated)
const findAll = async (req, res) => {
  let { admin, basic, pro, page } = req.query;

  var condition = {};

  if (admin) {
    condition = { "type.isAdmin": true };
  } else if (basic) {
    condition = { "type.accountType.member": "Basic Member" };
  } else if (pro) {
    condition = { "type.accountType.member": "Pro Member" };
  } else {
    condition = {};
  }

  if (page === undefined) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Users, pageLimit, condition);

  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const link = `${protocol}://${req.get("host")}${req.baseUrl}`;
  var nextLink =
    nextPage > dataCount.pageCount
      ? `${link}?page=${dataCount.pageCount}`
      : `${link}?page=${nextPage}`;
  var prevLink = page > 1 ? `${link}?page=${prevPage}` : null;
  var lastLink = `${link}?page=${dataCount.pageCount}`;
  var firstLink = `${link}?page=1`;

  const pageData = {
    currentPage: parseInt(page),
    pageCount: dataCount.pageCount,
    dataPerPage: parseInt(pageLimit),
    dataCount: dataCount.dataCount,
    links: {
      next: nextLink,
      prev: prevLink,
      last: lastLink,
      first: firstLink,
    },
  };

  await Users.find(condition)
    .populate({
      path: "referral",
      select:
        "referralCode referralCount referralAccount referralTotalAmount referralAvailableAmount referralWithDraw referralWithDrawBank referralWithDrawHistory referralStatus ",
    })
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "No users found!",
        });
      }

      const data = result.map((item) => {
        var {
          _id,
          name,
          username,
          email,
          phone,
          address,
          birthday,
          type,
          referral,
        } = item;

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
          referral,
        };
      });

      res.status(200).send({
        message: "Users fetched successfully!",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: err.message || "Some error occurred while fetching the Users.",
      });
    });
};

// Find a single user with an id (need to be updated)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  Users.findById(id)
    .populate({
      path: "referral",
      select:
        "referralCode referralCount referralAccount referralTotalAmount referralAvailableAmount referralWithDraw referralWithDrawBank referralWithDrawHistory referralStatus ",
    })
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
        referral,
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
        referral,
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

  if (!id || !ObjectId.isValid(id)) {
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

  if (!id || !ObjectId.isValid(id)) {
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

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          name: result.name,
          username: result.username,
          admin: result.type.isAdmin,
          role: result.type.accountType.member,
          isActivated: result.type.isActivated,
          image: result.image.imageLink,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: result.id,
          email: result.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
        }
      );

      res.send({
        message: "User updated successfully.",
        token,
        refreshToken,
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

  if (!id || !ObjectId.isValid(id) || !oldPassword || !newPassword) {
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

  if (!id || !ObjectId.isValid(id)) {
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

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const imageName = req.file.filename;
  const imageLink = `${protocol}://${req.get(
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

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          name: result.name,
          username: result.username,
          admin: result.type.isAdmin,
          role: result.type.accountType.member,
          isActivated: result.type.isActivated,
          image: result.image.imageLink,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: result.id,
          email: result.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "6h",
        }
      );

      res.send({
        message: "User's profile picture updated successfully.",
        token,
        refreshToken,
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

// Create Referral Code (Done)
const createReferralCode = (req, res) => {
  const { id } = req.params;
  var { referralCode } = req.body;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  if (!referralCode)
    // Generate random referral code with 8 characters
    referralCode = Math.random().toString(36).substring(2, 10);

  if (referralCode.length > 8) {
    return res.status(400).send({
      message: "Referral Code must be 8 characters or less",
    });
  }

  Referrals.findOne({ referralCode: referralCode })
    .then((result) => {
      if (result) {
        return res.status(409).send({
          message: "Referral Code already exists",
        });
      }

      const referral = new Referrals({
        referralCode: referralCode,
        referralUser: id,
      });

      referral
        .save()
        .then((result) => {
          const referralId = result._id;

          Users.findByIdAndUpdate(
            id,
            {
              referral: referralId,
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
                message: "User's refer code created successfully.",
              });
            })
            .catch((err) => {
              return res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the referral code.",
              });
            });
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while creating the referral.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the referral.",
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

// Request User Activation (Done)
const requestUserActivation = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "User ID is required",
    });
  }

  const result = await Users.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      return result;
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });

  if (result.type.isActivated === true) {
    return res.status(409).send({
      message: "User already activated",
    });
  }

  // Generate token
  const token = jwt.sign(
    {
      id: result._id,
      name: result.name,
      username: result.username,
      email: result.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  // Send email
  const response = await signupMailer(result.email, token);

  if (response == "Email sent") {
    return res.status(200).send({
      message: "User registered successfully! Please check your email.",
    });
  } else {
    return res.status(500).send({
      message: "Failed to send email.",
    });
  }
};

export {
  findAll,
  findOne,
  deleteUSer,
  update,
  changePassword,
  changeProfilePicture,
  createReferralCode,
  changeProMemberToBasicMember,
  requestUserActivation,
};
