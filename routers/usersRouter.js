import { Router } from "express";
import {
  login,
  findOne,
  findAll,
  create,
  update,
  deleteOne,
  addAdmin
  // findAllByDay,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/auth/login", login);
usersRouter.get("/addadmin", addAdmin);
usersRouter.get("/:id", findOne);
usersRouter.get("/", findAll);
usersRouter.post("/", create);
usersRouter.put("/:id", update);
usersRouter.delete("/:id", deleteOne);
// usersRouter.get("/pointages/:date", findAllByDay);

export default usersRouter;
