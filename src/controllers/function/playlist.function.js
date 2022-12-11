import db from "../../models/index.js";
const Playlists = db.playlists;

// Update Playlist video count
const updatePlaylistVideoCount = async (playlistId) => {
  const playlist = await Playlists.findById(playlistId);
  if (playlist) {
    const videoCount = playlist.videoCount;
    return await Playlists.findByIdAndUpdate(playlistId, {
      videoCount: videoCount + 1,
    })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return err.message;
      });
  } else {
    return false;
  }
};

export default updatePlaylistVideoCount;
