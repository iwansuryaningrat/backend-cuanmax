import db from "../models/index.js";
const Liveclass = db.liveclass;

import dataCounter from "./function/dataCounter.function.js";

// Find all liveclasses (Done)
const findAll = (req, res) => {
  const { status, category, tags } = req.query;
  const query = status ? { status: status } : {};

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  Liveclass.find(query)
    .sort({ createdAt: -1 })
    .then((liveclasses) => {
      res.send({
        message: "All liveclasses were fetched successfully",
        timestamp: new Date().toString(),
        data: liveclasses,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving liveclasses.",
      });
    });
};

// Find liveclass by id (Done)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live class Id is required",
    });
  }

  Liveclass.findById(id)
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found with id " + id,
        });
      }
      res.send({
        message: "Liveclass was fetched successfully",
        timestamp: new Date().toString(),
        data: liveclass,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error while retrieving liveclass",
      });
    });
};

// Delete liveclass (Done)
const deleteClass = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live class Id is required",
    });
  }

  Liveclass.findByIdAndRemove(id)
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found with id " + id,
        });
      }
      res.send({
        message: "Liveclass was deleted successfully",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error while deleting liveclass",
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  Liveclass.findByIdAndupdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Live Class not found",
        });
      }

      res.send({
        message: "Live Class was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating live class.",
        timestamp: new Date().toString(),
      });
    });
};

// Create liveclass (Done)
const create = (req, res) => {
  const liveclass = new Liveclass({
    title: req.body.title,
    liveclassCode: req.body.liveclassCode,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    tags: req.body.tags,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    status: req.body.status,
    benefits: req.body.benefits,
    participants: [],
  });

  liveclass
    .save()
    .then((result) => {
      res.send({
        message: "Live Class was created",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating Live Class.",
        timestamp: new Date().toString(),
      });
    });
};

// Need Testing
const uploadThumbnail = (req, res) => {
  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  Liveclass.findByIdAndUpdate(id, { thumbnail: photoLink }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Live Class not found",
        });
      }

      return res.status(200).send({
        message: "Live Class was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating live class.",
        timestamp: new Date().toString(),
      });
    });
};

export { findAll, findOne, deleteClass, update, create, uploadThumbnail };
