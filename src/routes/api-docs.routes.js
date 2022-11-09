import Express from "express";
const router = Express.Router();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/Cuanmax-API-Docs.json" assert { type: "json" };

const apiDocsRouter = (app) => {
  const options = {
    explorer: true,
  };

  router.use("/", swaggerUi.serve);
  router.get("/", swaggerUi.setup(swaggerDocument, options));
  app.use("/api-docs", router);
};

export default apiDocsRouter;
