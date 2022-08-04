import { Router } from "express";
import {
  findOne,
  getAllByWeek,
  // create,
  update,
  getPDF,
  getNumberSemainesEnAttente,
} from "../controllers/semainesController.js";

const semainesRouter = Router();

semainesRouter.get("/enattente/:numeroSemaine", getNumberSemainesEnAttente);
semainesRouter.get("/gestion/:year/:week", getAllByWeek);
semainesRouter.get("/:year/:week/:userId", findOne);
semainesRouter.get("/pdf/:prenomNom/:annee/:semaine/:version", getPDF);
// semainesRouter.post("/", create);
semainesRouter.put("/:id", update);

export default semainesRouter;
