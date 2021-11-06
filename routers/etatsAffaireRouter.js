import { Router } from "express";
import { getAll } from "../controllers/etatsAffaireController.js";

const etatsAffaireRouter = Router();

etatsAffaireRouter.get("/", getAll);

export default etatsAffaireRouter;
