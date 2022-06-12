const db = require("../models/index");
const Subscribers = db.subscribers;

exports.findAll = (req, res) => {
  Subscribers.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send({
        message: "Subscribers successfully fetched.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving Subscribers.",
      });
    });
};

exports.create = (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({
      message: "Email is required.",
    });
  }

  Subscribers.findOne({ email })
    .then((result) => {
      if (result) {
        return res.status(400).send({
          message: "Email already exists.",
        });
      }

      const subscribers = new Subscribers({
        email: email,
        startDate: new Date().toString(),
        status: "active",
      });

      subscribers
        .save()
        .then((result) => {
          res.status(200).send({
            message: "Playlist successfully added.",
            timestamp: new Date().toString(),
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
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
      res.status(500).send({
        message: err.message || "Some error while showing Subscribers.",
        timestamp: new Date().toString(),
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Subscriber ID is required.",
    });
  }

  Subscribers.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
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
      res.status(500).send({
        message: err.message || "Some error while updating Subscribers.",
      });
    });
};
