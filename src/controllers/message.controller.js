const db = require("../models/index");
const Message = db.message;

// Done
exports.findAll = (req, res) => {
  const { status } = req.query;

  if (status) {
    Message.find({ status: status })
      .sort({ createdAt: -1 })
      .then((message) => {
        res.send({
          message: "All message were fetched successfully",
          timestamp: new Date().toISOString(),
          data: message,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving message.",
        });
      });
  } else {
    Message.find()
      .sort({ createdAt: -1 })
      .then((message) => {
        res.send({
          message: "All message were fetched successfully",
          timestamp: new Date().toISOString(),
          data: message,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving message.",
        });
      });
  }
};

// Done
exports.create = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.message;

  if (!firstName || !subject || !email || !body) {
    return res.status(400).send({
      message: "First name, subject, email and message are required.",
    });
  }

  const message = new Message({
    firstName: firstName,
    lastName: lastName,
    email: email,
    subject: subject,
    message: body,
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

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Message.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

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

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

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

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

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

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

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
