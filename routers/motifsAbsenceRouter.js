import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/motifsAbsenceController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const motifsAbsenceRouter = Router();

motifsAbsenceRouter.get("/", getAll);
motifsAbsenceRouter.post("/", isResp, create);
motifsAbsenceRouter.put("/:id", isResp, update);
motifsAbsenceRouter.delete("/:id", isResp, deleteOne);

export default motifsAbsenceRouter;
