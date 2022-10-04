import { Router } from "express";
import {
  getAll,
  getAllByUser,
  getNumberCommandesEnAttente,
  create,
  changeEtat,
} from "../controllers/commandesController.js";
import { isChefEquipe, isResp } from "../middlewares/authMiddleware.js";

const commandesRouter = Router();

commandesRouter.get("/", isResp, getAll);
commandesRouter.get("/enattente", isResp, getNumberCommandesEnAttente);
commandesRouter.get("/user/:userId", isChefEquipe, getAllByUser);
commandesRouter.post("/", isChefEquipe, create);
commandesRouter.put("/:id", isResp, changeEtat);

export default commandesRouter;
