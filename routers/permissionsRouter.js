import { Router } from "express";
import { getAll } from "../controllers/permissionsController.js";

const permissionsRouter = Router();

permissionsRouter.get("/", getAll);

export default permissionsRouter;
