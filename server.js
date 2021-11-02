import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.get("/", (req, res) => res.status(404).end());
server.use("/api", apiRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server listen on http://localhost:" + PORT);
});
