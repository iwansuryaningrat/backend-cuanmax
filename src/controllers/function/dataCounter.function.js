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
const dataCounter = async (Model, itemPerPage, condition) => {
  let dataCount = 0;
  if (condition !== undefined || condition !== null || condition !== {}) {
    dataCount = await Model.where(condition)
      .countDocuments({})
      .then((docCount) => {
        return docCount;
      })
      .catch((err) => {
        return err.message;
      });
  } else {
    dataCount = await Model.countDocuments({})
      .then((docCount) => {
        return docCount;
      })
      .catch((err) => {
        return err.message;
      });
  }

  const pageCount = Math.ceil(dataCount / itemPerPage);
  return { dataCount, dataPerPage: itemPerPage, pageCount };
};

export default dataCounter;

// const test = async () => {
//   const docCount = await dataCounter(Videos, 5, { status: "Published" });
//   console.log(docCount);
//   process.exit(0);
// };

// test();
