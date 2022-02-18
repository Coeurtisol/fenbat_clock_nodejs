import { Router } from "express";
import permissionsRouter from "./permissionsRouter.js";
import rolesRouter from "./rolesRouter.js";
import usersRouter from "./usersRouter.js";
import pointagesRouter from "./pointagesRouter.js";
import semainesRouter from "./semainesRouter.js";
import etatsSemaineRouter from "./etatsSemaineRouter.js";
import entitesRouter from "./entitesRouter.js";
import motifsAbsenceRouter from "./motifsAbsenceRouter.js";
import affairesRouter from "./affairesRouter.js";
import secteursAffaireRouter from "./secteursAffaireRouter.js";
import typesAffaireRouter from "./typesAffaireRouter.js";
import clientsAffaireRouter from "./clientsAffaireRouter.js";
import donneursAffaireRouter from "./donneursAffaireRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import articlesRouter from "./articlesRouter.js";
import fournisseursRouter from "./fournisseursRouter.js";
import authRouter from "./authRouter.js";
import { hasValidToken } from "../middlewares/authMiddleware.js";

const apiRouter = Router();

// Generalités
apiRouter.use("/entites", hasValidToken, entitesRouter);
apiRouter.use("/affaires", hasValidToken, affairesRouter);
apiRouter.use("/secteursAffaire", hasValidToken, secteursAffaireRouter);
apiRouter.use("/typesAffaire", hasValidToken, typesAffaireRouter);
apiRouter.use("/clientsAffaire", hasValidToken, clientsAffaireRouter);
apiRouter.use("/donneursAffaire", hasValidToken, donneursAffaireRouter);
apiRouter.use("/permissions", hasValidToken, permissionsRouter);
apiRouter.use("/roles", hasValidToken, rolesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

// Pointages
apiRouter.use("/semaines", hasValidToken, semainesRouter);
apiRouter.use("/etatsSemaine", hasValidToken, etatsSemaineRouter);
apiRouter.use("/pointages", hasValidToken, pointagesRouter);
apiRouter.use("/motifsAbsence", hasValidToken, motifsAbsenceRouter);

// Commandes
apiRouter.use("/categories", hasValidToken, categoriesRouter);
apiRouter.use("/articles", hasValidToken, articlesRouter);
apiRouter.use("/fournisseurs", hasValidToken, fournisseursRouter);

export default apiRouter;
