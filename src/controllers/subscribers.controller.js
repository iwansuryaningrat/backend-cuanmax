const db = require("../models/index");
const Subscribers = db.subscribers;

exports.findAll = (req, res) => {
  Subscribers.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving Subscribers.",
      });
    });
};

exports.create = (req, res) => {
  const subscribers = new Subscribers({
    email: req.body.email,
    startDate: new Date(),
    endDate: "",
    status: "active",
  });

  Subscribers.save(subscribers)
    .then((result) => {
      res.status(200).send({
        message: "Playlist successfully added.",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating Subscribers.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Subscribers.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing Subscribers.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Subscribers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};
