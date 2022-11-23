import db from "../models/index.js";
const Services = db.services;

// Find all services
const findAll = (req, res) => {
  Services.find()
    .then((result) => {
      res.send({
        message: "Services was found",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving services.",
      });
    });
};

// Create service
const create = (req, res) => {
  const { serviceName, description, benefits } = req.body;

  const services = new Services({
    serviceName,
    description,
    benefits,
  });

  services
    .save()
    .then((result) => {
      res.status(200).send({
        message: "Service successfully added.",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating service.",
      });
    });
};

// Update image service by id
const uploadImage = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  if (!req.files) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  Services.findByIdAndUpdate(
    id,
    { image: { imageName: photoName, imagePath: photoLink } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Service not found",
        });
      }

      res.status(200).send({
        message: "Image successfully uploaded.",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while uploading image.",
      });
    });
};

// Find service by id
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
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing service.",
      });
    });
};

// Delete service by id
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
      return res.status(500).send({
        message: err.message || "Some error while delete service.",
      });
    });
};

// Update service by id
const update = (req, res) => {
  const { id } = req.params;
  const { serviceName, description, benefits } = req.body;

  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }

  Services.findByIdAndUpdate(
    id,
    { serviceName, description, benefits },
    { new: true }
  )
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
      return res.status(500).send({
        message: err.message || "Some error while update service.",
      });
    });
};

export { findAll, create, uploadImage, findOne, deleteService, update };
