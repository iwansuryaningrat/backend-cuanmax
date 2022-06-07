const { message } = require("../models/index");
const db = require("../models/index");
const Message = db.message;

// Done
exports.findAll = (req, res) => {
  const status = req.params.status;

  if (!status) {
    Message.find()
      .then((result) => {
        res.send({
          message: "Messages was successfully found",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving message.",
        });
      });
  } else {
    Message.find({ status: status })
      .then((result) => {
        res.send({
          message: "Messages was successfully found",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving message.",
        });
      });
  }
};

// Done
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
        message: "Message sent successfully.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating message.",
      });
    });
};

// Done
exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then((result) => {
      res.send({
        message: "Message was successfully found",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing message.",
      });
    });
};

// Done
exports.read = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndUpdate(id, { status: "Readed" })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

      result.status = "Readed";

      res.send({
        message: "Message read successfully.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

// Done
exports.reply = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndUpdate(id, { status: "Replied" })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

      result.status = "Replied";

      res.send({
        message: "Message status change successfully.",
        timestamp: new Date().toString(),
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
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete message.",
      });
    });
};
