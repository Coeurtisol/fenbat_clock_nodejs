import { Router } from "express";
import usersRouter from "./usersRouter.js"
import pointagesRouter from "./pointagesRouter.js";
import entitesRouter from "./entitesRouter.js";
import motifsAbsenceRouter from "./motifsAbsenceRouter.js";
import affairesRouter from "./affairesRouter.js";
import etatsAffaireRouter from "./etatsAffaireRouter.js";
import secteursAffaireRouter from "./secteursAffaireRouter.js";
import typesAffaireRouter from "./typesAffaireRouter.js";
// import categoriesRouter from "./categoriesRouter.js";
// import articlesRouter from "./articlesRouter.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/pointages", pointagesRouter);
apiRouter.use("/entites", entitesRouter);
apiRouter.use("/motifsAbsence", motifsAbsenceRouter);
apiRouter.use("/affaires", affairesRouter);
apiRouter.use("/etatsAffaire", etatsAffaireRouter);
apiRouter.use("/secteursAffaire", secteursAffaireRouter);
apiRouter.use("/typesAffaire", typesAffaireRouter);
// apiRouter.use("/categories", categoriesRouter);
// apiRouter.use("/articles", articlesRouter);

export default apiRouter;
