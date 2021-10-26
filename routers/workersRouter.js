import { Router } from "express";
import {
  findAll,
  create,
  deleteOne,
  findAllByDay
} from "../controllers/workersController.js";

const workersRouter = Router();

workersRouter.get("/", findAll);
workersRouter.post("/", create);
workersRouter.delete("/:id", deleteOne);
workersRouter.get("/workSessions/:date", findAllByDay);

export default workersRouter;
