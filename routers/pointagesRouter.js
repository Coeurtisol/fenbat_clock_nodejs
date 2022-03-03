import { Router } from "express";
import {
  findUsersPointagesSinceDate,
  create,
  update,
} from "../controllers/pointagesController.js";

const pointagesRouter = Router();

pointagesRouter.post("/overview", findUsersPointagesSinceDate);
pointagesRouter.post("/", create);
pointagesRouter.put("/:id", update);

export default pointagesRouter;
