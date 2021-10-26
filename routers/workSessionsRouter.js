import { Router } from "express";
import {
  create,
  update
} from "../controllers/workSessionsController.js";

const workSessionsRouter = Router();

workSessionsRouter.post("/",create);
workSessionsRouter.put("/:id",update);

export default workSessionsRouter;