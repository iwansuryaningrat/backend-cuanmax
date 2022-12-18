import db from "../../models/index.js";
const Liveclass = db.liveclass;

const findLiveclass = async (id) => {
  // Find a single liveclass with an id with validation where status is ongoing or upcoming
  const liveclass = await Liveclass.findById(id)
    .then((result) => {
      if (!result) {
        return { message: "Liveclass not found" };
      }

      return result;
    })
    .catch((err) => {
      return err;
    });

  return liveclass;
};

export default findLiveclass;
