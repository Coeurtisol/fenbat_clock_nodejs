import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/articlesController.js";

const articlesRouter = Router();

articlesRouter.get("/", getAll);
articlesRouter.post("/", create);
articlesRouter.put("/:id", update);
articlesRouter.delete("/:id", deleteOne);

export default articlesRouter;
