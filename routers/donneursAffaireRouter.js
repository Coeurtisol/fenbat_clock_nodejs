import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/donneursAffaireController.js";

const donneursAffaireRouter = Router();

donneursAffaireRouter.get("/", getAll);
donneursAffaireRouter.post("/", create);
donneursAffaireRouter.put("/:id", update);
donneursAffaireRouter.delete("/:id", deleteOne);

export default donneursAffaireRouter;