const db = require("../models/index");
const Services = db.services;

exports.findAll = (req, res) => {
  Services.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving services.",
      });
    });
};

exports.create = (req, res) => {
  const services = new Services({
    serviceName: req.body.serviceName,
    description: req.body.description,
    image: req.file.path,
    benefit: [
      {
        benefitName: req.body.benefitName,
      },
    ],
  });

  services
    .save()
    .then((result) => {
      res.status(200).send({
        message: "Service successfully added.",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating service.",
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Service not found",
        });
      }

      res.send({
        message: "Service was found",
        result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing service.",
      });
    });
};

exports.deleteService = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Service not found",
        });
      }

      res.send({
        message: "Service was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete service.",
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Service not found",
        });
      }

      res.send({
        message: "Service was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update service.",
      });
    });
};
