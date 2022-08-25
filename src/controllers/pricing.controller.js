import db from "../models/index.js";
const Pricing = db.pricing;

// Done
const findAll = (req, res) => {
  Pricing.find()
    .then((result) => {
      res.send({
        message: "Pricing successfully fetched",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving pricing.",
      });
    });
};

// Done
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Pricing Id is required",
    });
  }

  Pricing.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Pricing not found",
        });
      }

      res.send({
        message: "Pricing was successfully found",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing pricing.",
      });
    });
};

// Done
const deletePrice = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Pricing ID is required",
    });
  }

  Pricing.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Pricing not found",
        });
      }

      res.send({
        message: "Pricing was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete pricing.",
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Pricing ID is required",
    });
  }

  Pricing.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Pricing not found",
        });
      }

      res.send({
        message: "Pricing was successfully updated",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating pricing.",
      });
    });
};

// Done
const create = (req, res) => {
  const { memberName, duration, price, discountPrice, currency, features } =
    req.body;

  if (!memberName || !duration || !price || !currency || !features) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  Pricing.create({
    memberName,
    duration,
    price,
    discountPrice,
    currency,
    features,
  })
    .then((result) => {
      res.send({
        message: "Pricing was successfully created",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating pricing.",
      });
    });
};

export { findAll, findOne, deletePrice, update, create };
