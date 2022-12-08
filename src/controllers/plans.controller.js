import db from "../models/index.js";
const Plans = db.plans;

// Get all plans for Users (Active only) - Done
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
          features: plan.features,
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

// Get all plans for Admin - Done
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
          features: plan.features,
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

// Find a single plan with an id - Done
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

      const plan = {
        id: result._id,
        name: result.planName,
        duration: result.duration,
        price: result.price,
        discountPrice: result.discountPrice,
        currency: result.currency,
        features: result.features,
      };

      res.send({
        message: "Plan was successfully found",
        data: plan,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing plans.",
      });
    });
};

// Delete a plan with the specified id in the request - Done
const deletePlan = (req, res) => {
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
        message: "Plan was successfully deleted",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete plans.",
      });
    });
};

// Update a plan by the id in the request - Done
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
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating plans.",
      });
    });
};

// Create and Save a new Plans - Done
const create = (req, res) => {
  const { planName, duration, price, discountPrice, currency, features } =
    req.body;

  if (!planName || !duration || !price || !discountPrice || !features) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  Plans.create({
    planName,
    duration,
    price,
    discountPrice,
    currency,
    features,
  })
    .then((result) => {
      res.send({
        message: "Plan was successfully created",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating plan.",
      });
    });
};

// Deactivate a plan - Done
const deactivate = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Plans ID is required",
    });
  }

  Plans.findByIdAndUpdate(id, { status: "Inactive" }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Plans was successfully deactivated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deactivating plans.",
      });
    });
};

// Add feature to a plan - Done
const addFeature = (req, res) => {
  const { id } = req.params;
  const { features } = req.body;

  if (!id || !features) {
    return res.status(400).send({
      message: "Plans ID and feature name is required",
    });
  }

  Plans.findByIdAndUpdate(id, { $push: { features: features } }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Feature was successfully added to plan",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while adding feature to plan.",
      });
    });
};

// Delete feature from a plan - Done
const deleteFeature = (req, res) => {
  const { id } = req.params;
  const { features } = req.body;

  if (!id || !features) {
    return res.status(400).send({
      message: "Plans ID and feature name is required",
    });
  }

  Plans.findByIdAndUpdate(id, { $pull: { features: features } }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Feature was successfully deleted from plan",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deleting feature from plan.",
      });
    });
};

// Deactivate a feature from a plan - Done
const deactivateFeature = (req, res) => {
  const { id } = req.params;
  const { features } = req.body;
  const name = features.name;

  if (!id || !features) {
    return res.status(400).send({
      message: "Plans ID and feature name is required",
    });
  }

  Plans.updateOne(
    { _id: id, "features.name": name },
    { $set: { "features.$.status": false } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Plans not found",
        });
      }

      res.send({
        message: "Feature was successfully deactivated from plan",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error while deactivating feature from plan.",
      });
    });
};

export {
  findAll,
  findAllforUsers,
  findOne,
  deletePlan,
  update,
  create,
  deactivate,
  addFeature,
  deleteFeature,
  deactivateFeature,
};
