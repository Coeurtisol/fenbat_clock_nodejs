import { Router } from "express";
import {
  getAll,
  getAllByUser,
  getNumberCommandesEnAttente,
  create,
  changeEtat,
} from "../controllers/commandesController.js";

const commandesRouter = Router();

commandesRouter.get("/", getAll);
commandesRouter.get("/enattente", getNumberCommandesEnAttente);
commandesRouter.get("/user/:userId", getAllByUser);
commandesRouter.post("/", create);
commandesRouter.put("/:id", changeEtat);

export default commandesRouter;
