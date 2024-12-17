import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userDataController from "./api/controller/userDataController.js";
import fetchDataController from "./api/controller/fetchDataController.js";
import makeDbConnection from "./db/db.js";
dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(cors());

app.post("/user-data", userDataController)

app.get("/fetch-all", fetchDataController)

makeDbConnection(app)