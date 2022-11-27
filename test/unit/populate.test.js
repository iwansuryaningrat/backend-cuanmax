import db from "../../src/models/index.js";
const Users = db.users;
const Referrals = db.referrals;

const id = "638344ee3dd9f793479fa833";

// MongoDB Connection
import connect from "../../src/services/db.connect.service.js";
connect();

const populate = async (id) => {
  await Users.findById(id)
    .populate({
      path: "referral",
      select:
        "referralCode referralCount referralAccount referralTotalAmount referralAvailableAmount referralWithDraw referralWithDrawBank referralWithDrawHistory referralStatus ",
    })
    .then((result) => {
      console.log("result", result);
      process.exit(0);
    })
    .catch((err) => {
      console.log("err", err);
      process.exit(0);
    });
};

populate(id);
