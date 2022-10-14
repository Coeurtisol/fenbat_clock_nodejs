import dotenv from "dotenv";
import app from "./app.js";
import http from "http";

dotenv.config({ path: "./config/.env" });

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, () => {
  console.log(`server listen on ${HOST}:${PORT}`);
});
