import {
  findAll,
  deleteNews,
  createNews,
  findById,
  update,
} from "../controllers/news.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const newsRouter = (app) => {
  app.use(headers);

  router.get("/", findAll);
  router.post("/", login, admin, createNews);
  router.delete("/:id", login, admin, deleteNews);
  router.get("/:id", findById);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/news", router);
};

export default newsRouter;
