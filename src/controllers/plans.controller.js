import db from "../models/index.js";
const Plans = db.plans;

// Get all plans for Users
const findAllforUsers = (req, res) => {
  Plans.find({ status: "Active" })
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "No plan was found",
        });
      }

      const plans = result.map((plan) => {
        return {
          id: plan._id,
          name: plan.planName,
          duration: plan.duration,
          price: plan.price,
          discountPrice: plan.discountPrice,
          currency: plan.currency,
          feature: plan.feature,
        };
      });

      res.send({
        message: "Plans successfully fetched",
        data: plans,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving plans.",
      });
    });
};

// Get all plans for Admin
const findAll = (req, res) => {
  const { status } = req.query;

  var condition = status;

  Plans.find(condition)
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "No plan was found",
        });
      }

      const plans = result.map((plan) => {
        return {
          id: plan._id,
          name: plan.planName,
          duration: plan.duration,
          price: plan.price,
          discountPrice: plan.discountPrice,
          currency: plan.currency,
          feature: plan.feature,
          status: plan.status,
        };
      });

      res.send({
        message: "Plans successfully fetched",
        data: plans,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving plans.",
      });
    });
};

// Done
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Plans Id is required",
    });
  }

  Plans.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Plans was successfully found",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing plans.",
      });
    });
};

// Done
const deletePrice = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Plans ID is required",
    });
  }

  Plans.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Plans was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete plans.",
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Plans ID is required",
    });
  }

  Plans.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Plans was successfully updated",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating plans.",
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

  Plans.create({
    memberName,
    duration,
    price,
    discountPrice,
    currency,
    features,
  })
    .then((result) => {
      res.send({
        message: "Plans was successfully created",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating plans.",
      });
    });
};

export { findAll, findAllforUsers, findOne, deletePrice, update, create };
