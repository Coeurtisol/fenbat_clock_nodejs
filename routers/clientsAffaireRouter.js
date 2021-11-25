import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/clientsAffaireController.js";

const clientsAffaireRouter = Router();

clientsAffaireRouter.get("/", getAll);
clientsAffaireRouter.post("/", create);
clientsAffaireRouter.put("/:id", update);
clientsAffaireRouter.delete("/:id", deleteOne);

export default clientsAffaireRouter;