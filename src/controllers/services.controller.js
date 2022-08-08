import db from "../models/index.js";
const Services = db.services;

const findAll = (req, res) => {
  Services.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving services.",
      });
    });
};

const create = (req, res) => {
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
      return res.status(409).send({
        message: err.message || "Some error while creating service.",
      });
    });
};

const findOne = (req, res) => {
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
      return res.status(500).send({
        message: err.message || "Some error while showing service.",
      });
    });
};

const deleteService = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Service not found",
        });
      }

      res.send({
        message: "Service was deleted",
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while delete service.",
      });
    });
};

const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Service not found",
        });
      }

      res.send({
        message: "Service was updated",
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while update service.",
      });
    });
};

export { findAll, create, findOne, deleteService, update };
