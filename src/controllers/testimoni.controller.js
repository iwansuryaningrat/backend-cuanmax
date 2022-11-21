import db from "../models/index.js";
const Testimoni = db.testimoni;

// Find all testimoni for admin
const findAllAdmin = (req, res) => {
  const { active } = req.query;
  let condition = {};

  if (active === true) {
    condition = { status: "Active" };
  } else if (active === false) {
    condition = { status: "Inactive" };
  } else {
    condition = {};
  }

  Testimoni.find(condition)
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const data = result.map((item) => {
        const { _id, name, position, company, testimoni, photosUrl, status } =
          item;
        return {
          id: _id,
          name,
          position,
          company,
          testimoni,
          photosUrl,
          status,
        };
      });

      res.send({
        message: "Testimoni was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

// Find All testimoni for public (Done)
const findAll = (req, res) => {
  Testimoni.find({ status: "Active" })
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const data = result.map((item) => {
        const { name, position, company, testimoni, photosUrl } = item;
        return {
          name,
          position,
          company,
          testimoni,
          photosUrl,
        };
      });

      res.send({
        message: "Testimoni was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

// Find a single testimoni with an id (Done)
const findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const { _id, name, position, company, testimoni, photosUrl, status } =
        result;

      res.send({
        message: "Testimoni was successfully retrieved",
        data: {
          id: _id,
          name,
          position,
          company,
          testimoni,
          photosUrl,
          status,
        },
      });
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

export { findAllAdmin, findAll, findOne, create, deleteTesti, update };
