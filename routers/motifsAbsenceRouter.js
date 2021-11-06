import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/motifsAbsenceController.js";

const motifsAbsenceRouter = Router();

motifsAbsenceRouter.get("/", getAll);
motifsAbsenceRouter.post("/", create);
motifsAbsenceRouter.put("/:id", update);
motifsAbsenceRouter.delete("/:id", deleteOne);

export default motifsAbsenceRouter;