import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/affairesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const affairesRouter = Router();

affairesRouter.get("/", getAll);
affairesRouter.post("/", isResp, create);
affairesRouter.put("/:id", isResp, update);
affairesRouter.delete("/:id", isResp, deleteOne);

export default affairesRouter;
