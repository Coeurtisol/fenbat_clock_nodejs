import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/commandesController.js";

const commandesRouter = Router();

commandesRouter.get("/", getAll);
commandesRouter.post("/", create);
commandesRouter.put("/:id", update);
commandesRouter.delete("/:id", deleteOne);

export default commandesRouter;
