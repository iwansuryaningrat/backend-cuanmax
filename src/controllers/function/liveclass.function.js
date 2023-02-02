import db from "../../models/index.js";
const Liveclass = db.liveclass;

// Add User to Liveclass's Participant (Done)
const addParticipant = (userID, liveclassId) => {
  const liveclass = Liveclass.findById(liveclassId)
    .then((liveclass) => {
      if (!liveclass) {
        return false;
      }
      liveclass.participants.participantsCount++;
      liveclass.participants.participantsList.push({ userID });
      liveclass.save();
      return true;
    })
    .catch((err) => {
      return false;
    });

  return liveclass;
};

export default addParticipant;
