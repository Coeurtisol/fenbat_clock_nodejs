import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import https from "https";
import fs from "fs";

dotenv.config({ path: "./config/.env" });

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;
// http.createServer(app).listen(PORT, () => {
//   console.log(`server listen on ${HOST}:${PORT}`);
// });
https
  .createServer(
    {
      key: fs.readFileSync("cert/server.key"),
      cert: fs.readFileSync("cert/server.cert"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`server listen on https://${HOST}:${PORT}`);
  });
