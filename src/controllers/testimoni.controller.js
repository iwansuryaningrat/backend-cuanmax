const db = require("../models/index");
const Testimoni = db.testimoni;

exports.findAll = (req, res) => {
  Testimoni.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Testimoni.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing testimoni.",
      });
    });
};

exports.create = (req, res) => {
  const testimoni = new Testimoni({
    name: req.body.name,
    position: req.body.position,
    company: req.body.company,
    body: req.body.body,
    photosUrl: req.file.path,
  });

  testimoni
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating testimoni.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Testimoni.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete testimoni.",
      });
    });
};
