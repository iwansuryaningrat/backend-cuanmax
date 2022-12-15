import {
  findAllForUsers,
  findOne,
} from "../controllers/services.controller.js";
import Express from "express";
const router = Express.Router();

const servicesRouter = (app) => {
  router.get("/", findAllForUsers);
  router.get("/:id", findOne);

  app.use("/v1/services", router);
};

export default servicesRouter;
