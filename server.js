import dotenv from "dotenv";
import app from "./app.js";
import http from "http";

dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT || 4000;

http.createServer(app).listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
