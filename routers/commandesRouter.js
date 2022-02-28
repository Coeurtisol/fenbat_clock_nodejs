import { Router } from "express";
import {
  getAll,
  getAllByUser,
  getNumberCommandesEnAttente,
  create,
  valider,
  deleteOne,
} from "../controllers/commandesController.js";

const commandesRouter = Router();

commandesRouter.get("/", getAll);
commandesRouter.get("/enattente", getNumberCommandesEnAttente);
commandesRouter.get("/user/:userId", getAllByUser);
commandesRouter.post("/", create);
commandesRouter.put("/:id", valider);
commandesRouter.delete("/:id", deleteOne);

export default commandesRouter;
