import express from "express";
import { json } from "body-parser";
import http from "http";
// import cors from "cors";
import { connect, disconnect } from "mongoose";
import { dbConnection } from "./db";
import dotenv from "dotenv";
import { Routes } from "./interfaces/routes.interface";
import fs = require("fs");
import { errorHandler } from "./middlewares/error.middleware";
import path = require("path");
import { parse } from "yaml";
import swaggerUI from "swagger-ui-express";
// import postRoute from "./routes/post.routes";
import userRoute from "./routes/user.routes";
import taskRoute from "./routes/task.routes";


dotenv.config();

const routers = [
  // { path: "/post", router: postRoute },
  { path: "/user", router: userRoute },
  { path: "/task", router: taskRoute },
  
  
];
const app = express();
app.use(json());
// app.use(cors());
const server = http.createServer(app);


connectToDatabase();

//   const applyAuthMiddleware = (router: { path: any; instance: any; }) => {
//     app.use(router.path,  router.instance);
//   };
//   routers.forEach((router) => applyAuthMiddleware(router));
//   app.use('/auth', authRoute);

function initializeRoutes(routes: Routes[]) {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
  setupSwagger();
}

function setupSwagger() {
  const fileContents = fs.readFileSync(
    path.join(path.resolve(), "app.yml"),
    "utf8"
  );
  const doc = parse(fileContents);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(doc));
}

initializeRoutes(routers);


app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`🚀 SERVER IS RUNNING ${process.env.PORT}`);
});

async function connectToDatabase() {
  try {
    await connect(dbConnection.url || "");
    console.log("===== Connected to MongoDB ======");
    console.log(`=================================`);
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
