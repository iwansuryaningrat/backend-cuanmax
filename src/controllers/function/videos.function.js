import db from "../../models/index.js";
const Videos = db.videos;

// Update Video URL
const updateVideoUrl = async (videoId, url) => {
  return await Videos.findByIdAndUpdate(videoId, {
    url,
  })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });
};

export default updateVideoUrl;
