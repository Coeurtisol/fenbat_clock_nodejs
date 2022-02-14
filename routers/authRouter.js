import { Router } from "express";
import { isSecure, login, externalLogin } from "../controllers/authController.js";

const usersRouter = Router();

usersRouter.get("/issecure", isSecure);
usersRouter.post("/login", login);
usersRouter.post("/externalLogin", externalLogin);

export default usersRouter;
