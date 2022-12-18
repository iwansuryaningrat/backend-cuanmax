import db from "../../models/index.js";
const Playlists = db.playlists;
const Videos = db.videos;

const deleteAll = async () => {
  try {
    await Playlists.deleteMany({});
    await Videos.deleteMany({});
    return true;
  } catch (error) {
    return false;
  }
};

export default deleteAll;
