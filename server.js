import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";
import path from "path";
dotenv.config();

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

// Server
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

//  const server = http.createServer(app);
const server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
);

server.listen(PORT, () => {
  console.log(`server listen on ${HOST}:${PORT}`);
});
