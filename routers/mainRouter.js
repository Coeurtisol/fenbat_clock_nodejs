import { Router } from "express";
import usersRouter from "./usersRouter.js"
import pointagesRouter from "./pointagesRouter.js";

const mainRouter = Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/pointages", pointagesRouter);

export default mainRouter;
