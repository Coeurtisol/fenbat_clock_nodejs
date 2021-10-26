import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routers/mainRouter.js";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.get("/", (req, res) => res.status(404).end());
server.use("/api", mainRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server listen on http://localhost:" + PORT);
});
