import { Router } from "express";
import {
  findOne,
  getAllByWeek,
  create,
  update,
  getPDF,
} from "../controllers/semainesController.js";

const semainesRouter = Router();

semainesRouter.get("/gestion/:year/:week", getAllByWeek);
semainesRouter.get("/:year/:week/:userId", findOne);
semainesRouter.get("/pdf/:prenomNom/:annee/:semaine", getPDF);
semainesRouter.post("/", create);
semainesRouter.put("/:id", update);

export default semainesRouter;
