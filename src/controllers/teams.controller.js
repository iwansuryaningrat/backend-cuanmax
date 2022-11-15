import db from "../models/index.js";
const Teams = db.teams;

// Fetch all teams data (DONE)
const findAll = (req, res) => {
  Teams.find({ status: "Active" })
    .then((result) => {
      const data = result.map((item) => {
        const { name, description, position, photo, contact } = item;
        return {
          name,
          description,
          position,
          photo,
          contact,
        };
      });

      // Check if there is any data
      if (data.length === 0) {
        return res.status(404).send({
          message: "No data found.",
        });
      }

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
