import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/rolesController.js";

const rolesRouter = Router();

rolesRouter.get("/", getAll);
rolesRouter.post("/", create);
rolesRouter.put("/:id", update);
rolesRouter.delete("/:id", deleteOne);

export default rolesRouter;