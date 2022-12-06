import db from "../../models/index.js";
const Users = db.users;
import jwt from "jsonwebtoken";
import "dotenv/config";

// Verify Account (DONE)
const verifyAccount = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send({
      message: "Token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    user.type.isActivated = true;
    await user
      .save()
      .then((data) => {
        return res.status(200).send({
          message: "Account verified successfully",
          email: user.email,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while verifying account!",
        });
      });
  } catch (error) {
    return res.status(401).send({
      message: "Invalid Token",
    });
  }
};

export default verifyAccount;
