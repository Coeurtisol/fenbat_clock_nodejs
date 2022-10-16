import express from "express";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const app = express();
app.use(cors());

// API
app.use(express.json());
app.use("/api", apiRouter);

// client react
const buildPath = path.resolve() + "/public/build";
app.use(express.static(buildPath));
app.get("/*", (req, res) => {
  res.sendFile(buildPath + "/index.html", (error) => {
    console.log(error);
    res.status(404).end();
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
