import db from "../models/index.js";
const Messages = db.messages;

// Fetch All Messages from Database (Done)
const findAll = (req, res) => {
  const { status } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  Messages.find(query)
    .sort({ createdAt: -1 })
    .then((message) => {
      if (message.length < 1) {
        return res.status(404).send({
          message: "No Message was Found!",
        });
      }

      const data = message.map((item) => {
        const { firstName, lastName, email, subject, message, status } = item;

        return {
          firstName,
          lastName,
          email,
          subject,
          message,
          status,
        };
      });

      res.send({
        message: "All message were fetched successfully",
        data,
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

// Find Message By ID (Done)
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

      const { firstName, lastName, email, subject, message, status } = result;

      const data = {
        firstName,
        lastName,
        email,
        subject,
        message,
        status,
      };

      res.send({
        message: "Message was successfully found",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing message.",
      });
    });
};

// Update Status into Read (Done)
const read = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Message ID is required",
    });
  }

  Messages.findByIdAndUpdate(id, { status: "Read" }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Message not found",
        });
      }

      const { firstName, lastName, email, subject, message } = result;

      const data = {
        firstName,
        lastName,
        email,
        subject,
        message,
        status: "Readed",
      };

      res.send({
        message: "Message read successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

// Update Status into Replied (Done)
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

      const { firstName, lastName, email, subject, message } = result;

      const data = {
        firstName,
        lastName,
        email,
        subject,
        message,
        status: "Replied",
      };

      res.send({
        message: "Message status change successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update message.",
      });
    });
};

// Delete Message By Id (Done)
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
