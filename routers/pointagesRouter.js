import { Router } from "express";
import { findUsersPointagesSinceDate } from "../controllers/pointagesController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const pointagesRouter = Router();

pointagesRouter.post("/overview", isResp, findUsersPointagesSinceDate);
// pointagesRouter.post("/", create);
// pointagesRouter.put("/:id", update);

export default pointagesRouter;
