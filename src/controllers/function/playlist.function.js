import db from "../../models/index.js";
const Playlists = db.playlists;

// Update Playlist video count
export const updatePlaylistVideoCount = async (playlistId) => {
  const playlist = await Playlists.findOne({ where: { id: playlistId } });
  if (playlist) {
    const videoCount = playlist.videoCount;
    playlist.update({ videoCount: videoCount + 1 });
  } else {
    throw new Error("Playlist not found");
  }
};
