import db from "../../models/index.js";
const Liveclass = db.liveclass;

// Add User to Liveclass's Participant (Done)
const addParticipant = (userID, liveclassId) => {
  const liveclass = Liveclass.findById(liveclassId);

  if (!liveclass) {
    return false;
  }

  liveclass.participants.push(userID);
  liveclass.save();

  return true;
};

export default addParticipant;
