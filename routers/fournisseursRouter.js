import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/fournisseursController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const fournisseursRouter = Router();

fournisseursRouter.get("/", getAll);
fournisseursRouter.post("/", isResp, create);
fournisseursRouter.put("/:id", isResp, update);
fournisseursRouter.delete("/:id", isResp, deleteOne);

export default fournisseursRouter;
