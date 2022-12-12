// MongoDB Connection
import connect from "../../services/db.connect.service.js";
connect();

import db from "../../models/index.js";
const Liveclass = db.liveclass;
const LiveclassTransactions = db.liveclassTransactions;
const MembershipTransactions = db.membershipTransactions;
const Messages = db.messages;
const News = db.news;
const Plans = db.plans;
const Playlists = db.playlists;
const Referrals = db.referrals;
const RepliedMessages = db.repliedMessages;
const Services = db.services;
const Subscribers = db.subscribers;
const Teams = db.teams;
const Testimoni = db.testimoni;
const Users = db.users;
const Videos = db.videos;
const Vouchers = db.vouchers;

// Count Data
const dataCounter = async (Model, condition) => {
  if (condition !== undefined || condition !== null) {
    const result = await Model.where(condition)
      .countDocuments({})
      .then((docCount) => {
        console.log(condition);
        return docCount + 2;
      })
      .catch((err) => {
        return err.message;
      });
    return result;
  } else {
    const result = await Model.countDocuments({})
      .then((docCount) => {
        return docCount + 1;
      })
      .catch((err) => {
        return err.message;
      });
    return result;
  }
};

export default dataCounter;

// const test = async () => {
//   const docCount = await dataCounter(Videos, { status: "Archived" });
//   console.log(docCount);
//   process.exit(0);
// };

// test();
