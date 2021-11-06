import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/secteursAffaireController.js";

const secteursAffaireRouter = Router();

secteursAffaireRouter.get("/", getAll);
secteursAffaireRouter.post("/", create);
secteursAffaireRouter.put("/:id", update);
secteursAffaireRouter.delete("/:id", deleteOne);

export default secteursAffaireRouter;