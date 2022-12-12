import db from "../models/index.js";
const Subscribers = db.subscribers;

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Fetch all Subscribers (DONE)
const findAll = (req, res) => {
  const { active } = req.query;

  var condition = {};

  if (active) {
    condition.status = "Active";
  }

  Subscribers.find(condition)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).send({
          message: "No Subscribers found",
        });
      }

      const data = result.map((item) => {
        const { _id, email, startDate, endDate, status } = item;
        let newEndDate = new Date(endDate).toString();
        if (endDate == null || endDate == 0) newEndDate = null;
        return {
          id: _id,
          email: email,
          startDate: new Date(startDate).toString(),
          endDate: newEndDate,
          status: status,
        };
      });

      res.send({
        message: "Subscribers successfully fetched.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving Subscribers.",
      });
    });
};

// Subscribers Controller for users (DONE)
const create = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({
      message: "Email is required.",
    });
  }

  Subscribers.findOne({ email })
    .then((result) => {
      if (result) {
        return res.status(422).send({
          message: "You are already subscribed.",
        });
      }

      const subscribers = new Subscribers({
        email: email,
        startDate: new Date().toString(),
        status: "Active",
      });

      subscribers
        .save()
        .then((result) => {
          res.status(200).send({
            message: "You have successfully subscribed.",
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || "Some error while creating Subscribers.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating Subscribers.",
      });
    });
};

// Find a single Subscribers with an id (DONE)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Subscriber not found",
        });
      }

      let newEndDate = new Date(result.endDate).toString();
      if (result.endDate == null || result.endDate == 0) newEndDate = null;

      const data = {
        id: result._id,
        email: result.email,
        startDate: new Date(result.startDate).toString(),
        endDate: newEndDate,
        status: result.status,
      };

      res.send({
        message: "Subscriber was found.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing Subscribers.",
      });
    });
};

// Delete a Subscribers with the specified id in the request (DONE)
const deleteSubs = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was successfully deleted.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};

// Update a Subscribers by the id in the request (DONE)
const deactivate = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  const endDate = new Date();

  Subscribers.findByIdAndUpdate(
    id,
    { endDate, status: "Inactive" },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Subscriber not found",
        });
      }

      res.send({
        message: "Subscriber was successfully deactivated.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating Subscribers.",
      });
    });
};

export { findAll, create, findOne, deleteSubs, deactivate };
