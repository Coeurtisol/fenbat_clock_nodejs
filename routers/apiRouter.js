import { Router } from "express";
import usersRouter from "./usersRouter.js"
import pointagesRouter from "./pointagesRouter.js";
// import categoriesRouter from "./categoriesRouter.js";
// import articlesRouter from "./articlesRouter.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/pointages", pointagesRouter);
// apiRouter.use("/categories", categoriesRouter);
// apiRouter.use("/articles", articlesRouter);

export default apiRouter;
