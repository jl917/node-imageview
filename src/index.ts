import express, { Express } from "express";
import * as routes from "@/router";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/test");

export const app: Express = express();
const port = 5000;

// 라우팅 처리
for (const router of Object.values(routes)) {
  app.use("/", router.default);
}

app.use(express.static("./src/public"));
app.use("/upload", express.static("./upload"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
