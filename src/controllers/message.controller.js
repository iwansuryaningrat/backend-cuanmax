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
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: req.file.path,
    videoCount: 0,
  });

  Message.save(message)
    .then((result) => {
      res.status(200).send({
        message: "Message successfully added.",
      });
    })
    .catch((err) => {
      res.status(409).send({
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

exports.update = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Message not found",
        });
      }

      res.send({
        message: "Message was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
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
      res.status(409).send({
        message: err.message || "Some error while delete message.",
      });
    });
};
