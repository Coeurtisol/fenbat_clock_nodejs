import { Router } from "express";
import {
  findOne,
  create,
  update
} from "../controllers/semainesController.js";

const semainesRouter = Router();

semainesRouter.get("/:year/:week/:userId",findOne);
semainesRouter.post("/",create);
semainesRouter.put("/:id",update);

export default semainesRouter;