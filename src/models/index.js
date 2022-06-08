const dbConfig = require("../configs/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users.model")(mongoose);
// db.playlists = require("./playlists.model")(mongoose);
// db.videos = require("./videos.model")(mongoose);
db.subscribers = require("./subscribers.model")(mongoose);
db.message = require("./message.model")(mongoose);
// db.pricing = require("./pricing.model")(mongoose);
db.teams = require("./teams.model")(mongoose);
// db.vouchers = require("./vouchers.model")(mongoose);
// db.testimoni = require("./testimoni.model")(mongoose);
// db.services = require("./services.model")(mongoose);
db.watchlist = require("./watchlist.model")(mongoose);

module.exports = db;
