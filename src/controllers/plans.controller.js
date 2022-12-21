import db from "../models/index.js";
const Plans = db.plans;
import dataCounter from "./function/dataCounter.function.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Get all plans for Users (Active only) - Done
const findAllforUsers = async (req, res) => {
  let { page, pageLimit } = req.query;

  if (page === undefined) page = 1;
  if (pageLimit === undefined) pageLimit = 10;

  const condition = { status: "Active" };
  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Plans, pageLimit, condition);

  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const link = `${protocol}://${req.get("host")}${req.baseUrl}`;
  var nextLink =
    nextPage > dataCount.pageCount
      ? `${link}?page=${dataCount.pageCount}`
      : `${link}?page=${nextPage}`;
  var prevLink = page > 1 ? `${link}?page=${prevPage}` : null;
  var lastLink = `${link}?page=${dataCount.pageCount}`;
  var firstLink = `${link}?page=1`;

  const pageData = {
    currentPage: parseInt(page),
    pageCount: dataCount.pageCount,
    dataPerPage: parseInt(pageLimit),
    dataCount: dataCount.dataCount,
    links: {
      next: nextLink,
      prev: prevLink,
      last: lastLink,
      first: firstLink,
    },
  };

  await Plans.find(condition)
    .skip(skip)
    .limit(pageLimit)
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
          totalPrice: plan.totalPrice,
          currency: plan.currency,
          favourite: plan.favourite,
          features: plan.features,
        };
      });

      res.send({
        message: "Plans successfully fetched",
        data: plans,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving plans.",
      });
    });
};

// Get all plans for Admin - Done
const findAll = async (req, res) => {
  let { status, page } = req.query;

  if (status === undefined) status = "Active";
  var condition = { status };

  if (page === undefined) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Plans, pageLimit, condition);

  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const link = `${protocol}://${req.get("host")}${req.baseUrl}`;
  var nextLink =
    nextPage > dataCount.pageCount
      ? `${link}?page=${dataCount.pageCount}`
      : `${link}?page=${nextPage}`;
  var prevLink = page > 1 ? `${link}?page=${prevPage}` : null;
  var lastLink = `${link}?page=${dataCount.pageCount}`;
  var firstLink = `${link}?page=1`;

  const pageData = {
    currentPage: parseInt(page),
    pageCount: dataCount.pageCount,
    dataPerPage: parseInt(pageLimit),
    dataCount: dataCount.dataCount,
    links: {
      next: nextLink,
      prev: prevLink,
      last: lastLink,
      first: firstLink,
    },
  };

  await Plans.find(condition)
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
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
        page: pageData,
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

  if (!id || !ObjectId.isValid(id)) {
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

  if (!id || !ObjectId.isValid(id)) {
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

  if (!id || !ObjectId.isValid(id)) {
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
  const {
    planName,
    duration,
    price,
    discountPrice,
    totalPrice,
    currency,
    favourite,
    features,
  } = req.body;

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
    totalPrice,
    currency,
    favourite,
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

  if (!id || !ObjectId.isValid(id)) {
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

  if (!id || !ObjectId.isValid(id) || !features) {
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

  if (!id || !ObjectId.isValid(id) || !features) {
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

  if (!id || !ObjectId.isValid(id) || !features) {
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
