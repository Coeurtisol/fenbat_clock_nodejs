import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteOne,
} from "../controllers/articlesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const articlesRouter = Router();

articlesRouter.get("/", getAll);
articlesRouter.post("/", isResp, create);
articlesRouter.put("/:id", isResp, update);
articlesRouter.delete("/:id", isResp, deleteOne);

export default articlesRouter;
