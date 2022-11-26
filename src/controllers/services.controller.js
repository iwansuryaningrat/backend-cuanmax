import db from "../models/index.js";
const Services = db.services;

// Find all services in database (Done)
const findAll = (req, res) => {
  // Active filter by query params
  const { active } = req.query;

  // Filter by active
  let condition = {};

  if (active) {
    condition = { status: "Active" };
  } else if (active === false) {
    condition = { status: "Inactive" };
  } else {
    condition = {};
  }

  Services.find(condition)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).send({
          message: "Services not found",
        });
      }

      const data = result.map((item) => {
        return {
          id: item._id,
          serviceName: item.serviceName,
          description: item.description,
          image: item.image,
          benefits: item.benefits,
        };
      });

      res.send({
        message: "Services was found",
        data,
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
