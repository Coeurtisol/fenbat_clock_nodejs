import { Router } from "express";
import { getAll } from "../controllers/etatsSemaineController.js";

const etatsSemaineRouter = Router();

etatsSemaineRouter.get("/", getAll);

export default etatsSemaineRouter;
