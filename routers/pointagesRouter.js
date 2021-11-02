import { Router } from "express";
import {
  create,
  update
} from "../controllers/pointagesController.js";

const pointagesRouter = Router();

pointagesRouter.post("/",create);
pointagesRouter.put("/:id",update);

export default pointagesRouter;