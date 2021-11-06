import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/fournisseursController.js";

const fournisseursRouter = Router();

fournisseursRouter.get("/", getAll);
fournisseursRouter.post("/", create);
fournisseursRouter.put("/:id", update);
fournisseursRouter.delete("/:id", deleteOne);

export default fournisseursRouter;