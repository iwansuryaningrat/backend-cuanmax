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
