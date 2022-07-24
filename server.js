import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";
import path from "path";
dotenv.config();

const server = express();
server.use(cors());

// API
server.use(express.json());
server.use("/api", apiRouter);

// client react
const buildPath = path.resolve() + "/public/build";
server.use(express.static(buildPath));
server.get("/*", (req, res) => {
  res.sendFile(buildPath + "/index.html", (error) => {
    console.log(error);
    res.status(404).end();
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server listen on http://localhost:" + PORT);
});
