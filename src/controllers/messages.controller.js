import db from "../models/index.js";
const Messages = db.messages;

// Done
const findAll = (req, res) => {
  const { status } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  Messages.find(query)
    .sort({ createdAt: -1 })
    .then((message) => {
      res.send({
        message: "All message were fetched successfully",
        data: message,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving message.",
      });
    });
};

// Create and Save a new Message to the database (Done)
const create = (req, res) => {
  const { firstName, lastName, email, subject, body } = req.body;

  if (!firstName || !subject || !email || !body) {
    return res.status(400).send({
      message: "First name, subject, email and message are required.",
    });
  }

  const message = new Messages({
    firstName,
    lastName,
    email,
    subject,
    message: body,
  });

  message
    .save()
    .then((result) => {
      res.status(200).send({
        message: "Message sent successfully.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating message.",
      });
    });
};

// Find Message By ID
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Messages.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Message not found",
        });
      }

      res.send({
        message: "Message was successfully found",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing message.",
      });
    });
};

// Done
const read = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Messages.findByIdAndUpdate(id, { status: "Readed" }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Message not found",
        });
      }

      result.status = "Readed";

      res.send({
        message: "Message read successfully.",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

// Done
const reply = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Messages.findByIdAndUpdate(id, { status: "Replied" }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Message not found",
        });
      }

      result.status = "Replied";

      res.send({
        message: "Message status change successfully.",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

const deleteMsg = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Messages.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Message not found",
        });
      }

      res.send({
        message: "Message was deleted",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete message.",
      });
    });
};

export { findAll, create, findOne, read, reply, deleteMsg };
