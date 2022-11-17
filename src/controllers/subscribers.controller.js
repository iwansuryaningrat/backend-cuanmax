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
          startDate: item.startDate,
          endDate: item.endDate,
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

      res.send({
        message: "Subscriber was found.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing Subscribers.",
        timestamp: new Date().toString(),
      });
    });
};

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
        message: "Playlist was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};

const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Subscriber not found",
        });
      }

      res.send({
        message: "Subscriber was updated.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating Subscribers.",
      });
    });
};

export { findAll, create, findOne, deleteSubs, update };
