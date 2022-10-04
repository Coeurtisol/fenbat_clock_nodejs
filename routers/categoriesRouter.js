import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/categoriesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getAll);
categoriesRouter.post("/", isResp, create);
categoriesRouter.put("/:id", isResp, update);
categoriesRouter.delete("/:id", isResp, deleteOne);

export default categoriesRouter;
