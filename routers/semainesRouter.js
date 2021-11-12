import { Router } from "express";
import {
  create,
  update
} from "../controllers/semainesController.js";

const semainesRouter = Router();

semainesRouter.post("/",create);
semainesRouter.put("/:id",update);

export default semainesRouter;