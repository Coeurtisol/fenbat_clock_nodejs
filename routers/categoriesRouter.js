import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAll);
categoriesRouter.post("/", create);
categoriesRouter.put("/:id", update);
categoriesRouter.delete("/:id", deleteOne);

export default categoriesRouter;
