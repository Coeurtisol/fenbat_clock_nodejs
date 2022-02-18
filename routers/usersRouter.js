import { Router } from "express";
import {
  findOne,
  findAll,
  create,
  update,
  deleteOne,
  addAdmin
  // findAllByDay,
} from "../controllers/usersController.js";
import { hasValidToken } from "../middlewares/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/addadmin", addAdmin);
usersRouter.get("/:id", hasValidToken, findOne);
usersRouter.get("/", findAll);
usersRouter.post("/", hasValidToken, create);
usersRouter.put("/:id", hasValidToken, update);
usersRouter.delete("/:id", hasValidToken, deleteOne);
// usersRouter.get("/pointages/:date", findAllByDay);

export default usersRouter;
