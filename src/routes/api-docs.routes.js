import Express from "express";
const router = Express.Router();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/Cuanmax-API-Docs.json" assert { type: "json" };

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

const apiDocsRouter = (app) => {
  router.use("/", swaggerUi.serve);
  router.get("/", swaggerUi.setup(swaggerDocument));
  app.use("/api-docs", router);
};

export default apiDocsRouter;
