const { message } = require("../models/index");
const db = require("../models/index");
const Message = db.message;

exports.findAll = (req, res) => {
  Message.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving message.",
      });
    });
};

exports.create = (req, res) => {
  const message = new Message({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    status: "Unreaded",
  });

  message
    .save()
    .then((result) => {
      res.status(200).send({
        message: "Message successfully added.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating message.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing message.",
      });
    });
};

exports.read = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndUpdate(id, { status: "Readed" })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

      res.send({
        message: "Message was readed",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

      res.send({
        message: "Message was deleted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete message.",
      });
    });
};

exports.findByStatus = (req, res) => {
  const status = req.params.status;

  Message.find({ status: status })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing message.",
      });
    });
};
