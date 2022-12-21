import db from "../../models/index.js";
const Users = db.users;
import jwt from "jsonwebtoken";
import "dotenv/config";

// Refresh Token Controller Function (DONE)
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const id = decoded.id;
    await Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found!",
          });
        } else {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              username: user.username,
              admin: user.type.isAdmin,
              role: user.type.accountType.member,
              isActivated: user.type.isActivated,
              image: user.image.imageLink,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "3h",
            }
          );
          const refreshToken = jwt.sign(
            {
              id: user.id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "6h",
            }
          );
          return res.status(200).send({
            message: "Token successfully refreshed",
            token,
            refreshToken,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  } catch (e) {
    return res.status(400).send({
      message: "Invalid token",
    });
  }
};

export default refreshToken;
