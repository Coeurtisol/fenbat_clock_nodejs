import { Router } from "express";
import usersRouter from "./usersRouter.js"
import pointagesRouter from "./pointagesRouter.js";
import semainesRouter from "./semainesRouter.js";
import etatsSemaineRouter from "./etatsSemaineRouter.js";
import entitesRouter from "./entitesRouter.js";
import motifsAbsenceRouter from "./motifsAbsenceRouter.js";
import affairesRouter from "./affairesRouter.js";
import secteursAffaireRouter from "./secteursAffaireRouter.js";
import typesAffaireRouter from "./typesAffaireRouter.js";
import clientsAffaireRouter from "./clientsAffaireRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import articlesRouter from "./articlesRouter.js";
import fournisseursRouter from "./fournisseursRouter.js";

const apiRouter = Router();

// Generalités
apiRouter.use("/entites", entitesRouter);
apiRouter.use("/affaires", affairesRouter);
apiRouter.use("/secteursAffaire", secteursAffaireRouter);
apiRouter.use("/typesAffaire", typesAffaireRouter);
apiRouter.use("/clientsAffaire", clientsAffaireRouter);
apiRouter.use("/users", usersRouter);

// Pointages
apiRouter.use("/semaines", semainesRouter);
apiRouter.use("/etatsSemaine", etatsSemaineRouter);
apiRouter.use("/pointages", pointagesRouter);
apiRouter.use("/motifsAbsence", motifsAbsenceRouter);

// Commandes
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/fournisseurs", fournisseursRouter);

export default apiRouter;
