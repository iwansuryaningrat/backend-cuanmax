const db = require("../models/index");
const Liveclass = db.liveclass;

// Find all liveclasses (Done)
exports.findAll = (req, res) => {
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
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving liveclasses.",
      });
    });
};

// Find liveclass by id (Done)
exports.findOne = (req, res) => {
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
exports.deleteClass = (req, res) => {
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
exports.update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  Liveclass.findByIdAndupdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Live Class not found",
        });
      }

      res.send({
        message: "Live Class was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while updating live class.",
        timestamp: new Date().toString(),
      });
    });
};

// Create liveclass (Done)
exports.create = (req, res) => {
  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/foto/${photoName}`;

  const liveclass = new Liveclass({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    tags: req.body.tags,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    status: req.body.status,
    cover: {
      imageName: photoName,
      imagePath: photoLink,
    },
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
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Live Class.",
        timestamp: new Date().toString(),
      });
    });
};
