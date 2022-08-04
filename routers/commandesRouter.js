import { Router } from "express";
import {
  getAll,
  getAllByUser,
  getNumberCommandesEnAttente,
  create,
  changeEtat,
  // deleteOne,
} from "../controllers/commandesController.js";

const commandesRouter = Router();

commandesRouter.get("/", getAll);
commandesRouter.get("/enattente", getNumberCommandesEnAttente);
commandesRouter.get("/user/:userId", getAllByUser);
commandesRouter.post("/", create);
commandesRouter.put("/:id", changeEtat);
// commandesRouter.delete("/:id", deleteOne);

export default commandesRouter;
