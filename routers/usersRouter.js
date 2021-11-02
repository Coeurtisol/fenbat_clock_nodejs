import { Router } from "express";
import {
  login,
  findAll,
  create,
  deleteOne,
  findAllByDay,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/auth/login", login);
usersRouter.get("/", findAll);
usersRouter.post("/", create);
usersRouter.delete("/:id", deleteOne);
usersRouter.get("/pointages/:date", findAllByDay);

export default usersRouter;
