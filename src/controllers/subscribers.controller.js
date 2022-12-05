import db from "../models/index.js";
const Subscribers = db.subscribers;

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
        return {
          email: item.email,
          startDate: item.startDate.toString(),
          endDate: item.endDate.toString(),
          status: item.status,
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

  if (!id) {
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

      const data = {
        email: result.email,
        startDate: result.startDate.toString(),
        endDate: result.endDate.toString(),
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

  if (!id) {
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

  if (!id) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findByIdAndUpdate(id, { status: "Inactive" }, { new: true })
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
