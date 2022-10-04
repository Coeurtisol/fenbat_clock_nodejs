import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/entitesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const entitesRouter = Router();

entitesRouter.get("/", getAll);
entitesRouter.post("/", isResp, create);
entitesRouter.put("/:id", isResp, update);
entitesRouter.delete("/:id", isResp, deleteOne);

export default entitesRouter;
