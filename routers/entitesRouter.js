import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/entitesController.js";

const entitesRouter = Router();

entitesRouter.get("/", getAll);
entitesRouter.post("/", create);
entitesRouter.put("/:id", update);
entitesRouter.delete("/:id", deleteOne);

export default entitesRouter;