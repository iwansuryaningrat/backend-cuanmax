import db from "../models/index.js";
const Testimoni = db.testimoni;

const findAll = (req, res) => {
  Testimoni.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing testimoni.",
      });
    });
};

const create = (req, res) => {
  const testimoni = new Testimoni({
    name: req.body.name,
    position: req.body.position,
    company: req.body.company,
    testimoni: req.body.testimoni,
  });

  testimoni
    .save()
    .then((result) => {
      res.send({
        message: "Testimoni was successfully created",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating testimoni.",
      });
    });
};

const deleteTesti = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was deleted",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete testimoni.",
      });
    });
};

const update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was updated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update testimoni.",
      });
    });
};

export { findAll, findOne, create, deleteTesti, update };