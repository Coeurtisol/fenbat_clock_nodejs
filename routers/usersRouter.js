import { Router } from "express";
import {
  findOne,
  findAll,
  create,
  update,
  deleteOne,
  // addAdmin,
  // findAllByDay,
} from "../controllers/usersController.js";
import { isResp } from "../middlewares/authMiddleware.js";

const usersRouter = Router();
// usersRouter.get("/addadmin", addAdmin);
usersRouter.get("/:id", findOne);
usersRouter.get("/", isResp, findAll);
usersRouter.post("/", isResp, create);
usersRouter.put("/:id", update);
usersRouter.delete("/:id", isResp, deleteOne);
// usersRouter.get("/pointages/:date", findAllByDay);

export default usersRouter;
