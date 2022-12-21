import db from "../../models/index.js";
const Playlists = db.playlists;

// Increment Playlist video count
const incrementPlaylistVideoCount = async (playlistId) => {
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

// Decrement Playlist video count
const decrementPlaylistVideoCount = async (playlistId) => {
  const playlist = await Playlists.findById(playlistId);
  if (playlist) {
    const videoCount = playlist.videoCount;
    return await Playlists.findByIdAndUpdate(playlistId, {
      videoCount: videoCount - 1,
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

export { incrementPlaylistVideoCount, decrementPlaylistVideoCount };
