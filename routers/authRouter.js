import { Router } from "express";
import {
  isSecure,
  login,
  externalLogin,
  getActiveUsersList,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/usersList", getActiveUsersList);
authRouter.get("/issecure", isSecure);
authRouter.post("/login", login);
authRouter.post("/externalLogin", externalLogin);

export default authRouter;
