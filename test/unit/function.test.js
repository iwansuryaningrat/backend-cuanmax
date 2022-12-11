import db from "../../src/models/index.js";
const Playlists = db.playlists;
import updatePlaylistVideoCount from "../../src/controllers/function/playlist.function.js";

// MongoDB Connection
import connect from "../../src/services/db.connect.service.js";
connect();

// Update Playlist video count
const playlistId = "6394508678dc698beec974b8";
const result = await updatePlaylistVideoCount(playlistId);
console.log(result);
