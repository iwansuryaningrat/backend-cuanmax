import db from "../models/index.js";
const Services = db.services;

// Done
const findAll = (req, res) => {
  Services.find()
    .then((result) => {
      res.send({
        message: "Services was found",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving services.",
      });
    });
};

// Done
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
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating service.",
      });
    });
};

// Done
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
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while uploading image.",
      });
    });
};

// Done
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
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing service.",
      });
    });
};

// Done
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
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete service.",
      });
    });
};

// Done
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
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update service.",
      });
    });
};

export { findAll, create, uploadImage, findOne, deleteService, update };
