import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/typesAffaireController.js";

const typesAffaireRouter = Router();

typesAffaireRouter.get("/", getAll);
typesAffaireRouter.post("/", create);
typesAffaireRouter.put("/:id", update);
typesAffaireRouter.delete("/:id", deleteOne);

export default typesAffaireRouter;