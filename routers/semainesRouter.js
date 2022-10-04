import { Router } from "express";
import {
  findOne,
  getAllByWeek,
  update,
  // getPDF,
  getNumberSemainesEnAttente,
} from "../controllers/semainesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const semainesRouter = Router();

semainesRouter.get(
  "/enattente/:numeroSemaine",
  isResp,
  getNumberSemainesEnAttente
);
semainesRouter.get("/gestion/:year/:week", isResp, getAllByWeek);
semainesRouter.get("/:year/:week/:userId", findOne);
// semainesRouter.get("/pdf/:prenomNom/:annee/:semaine/:version", getPDF);
semainesRouter.put("/:id", update);

export default semainesRouter;
