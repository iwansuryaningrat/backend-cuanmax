import dbConfig from "../configs/db.config.js";
import mongoose from "mongoose";
import Liveclass from "../models/liveclass.model.js";
import Messages from "../models/messages.model.js";
import News from "../models/news.model.js";
import Playlists from "../models/playlists.model.js";
import Plans from "./plans.model.js";
import Referrals from "./referral.model.js";
import RepliedMessages from "../models/repliedMessages.model.js";
import Services from "../models/services.model.js";
import Subscribers from "../models/subscribers.model.js";
import Teams from "../models/teams.model.js";
import Testimoni from "../models/testimoni.model.js";
import MembershipTransactions from "./membershipTransactions.model.js";
import LiveclassTransactions from "./liveclassTransactions.model.js";
import Users from "../models/users.model.js";
import Videos from "../models/videos.model.js";
import Vouchers from "../models/vouchers.model.js";
import Watchlist from "../models/watchlist.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.liveclass = Liveclass(mongoose);
db.messages = Messages(mongoose);
db.news = News(mongoose);
db.playlists = Playlists(mongoose);
db.plans = Plans(mongoose);
db.referrals = Referrals(mongoose);
db.repliedMessages = RepliedMessages(mongoose);
db.services = Services(mongoose);
db.subscribers = Subscribers(mongoose);
db.teams = Teams(mongoose);
db.testimoni = Testimoni(mongoose);
db.membershipTransactions = MembershipTransactions(mongoose);
db.liveclassTransactions = LiveclassTransactions(mongoose);
db.users = Users(mongoose);
db.videos = Videos(mongoose);
db.vouchers = Vouchers(mongoose);
db.watchlist = Watchlist(mongoose);

export default db;
