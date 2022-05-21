const dbConfig = require("../configs/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.playlists = require("./playlists.model")(mongoose);
db.profiles = require("./profiles.model")(mongoose);
db.videos = require("./videos.model")(mongoose);
db.subscribers = require("./subscribers.model")(mongoose);
db.message = require("./message.model")(mongoose);
db.pricing = require("./pricing.model")(mongoose);
db.teams = require("./teams.model")(mongoose);

module.exports = db;
