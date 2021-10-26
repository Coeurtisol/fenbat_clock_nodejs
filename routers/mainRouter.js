import { Router } from "express";
import workersRouter from "./workersRouter.js"
import workSessionsRouter from "./workSessionsRouter.js";

const mainRouter = Router();

mainRouter.use("/workers", workersRouter);
mainRouter.use("/worksessions", workSessionsRouter);

export default mainRouter;
