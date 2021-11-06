import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/affairesController.js";

const affairesRouter = Router();

affairesRouter.get("/", getAll);
affairesRouter.post("/", create);
affairesRouter.put("/:id", update);
affairesRouter.delete("/:id", deleteOne);

export default affairesRouter;