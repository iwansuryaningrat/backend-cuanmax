import db from "../models/index.js";
const Teams = db.teams;

// Fetch all teams data (DONE)
const findAll = (req, res) => {
  Teams.find({ status: "Active" })
    .then((result) => {
      // Check if there is any data
      if (result.length === 0) {
        return res.status(404).send({
          message: "No data found.",
        });
      }

      const data = result.map((item) => {
        const { _id, name, description, position, photo, contact } = item;
        return {
          id: _id,
          name,
          description,
          position,
          photo,
          contact,
        };
      });

      res.send({
        message: "Teams successfully fetched.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving teams.",
      });
    });
};

export default findAll;
