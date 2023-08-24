import * as express from "express";
import * as ChangeController from "../controllers/AlertController";
import { verify } from "../middleware/verify";

export const routerChanges = express.Router();

routerChanges.get("/add", ChangeController.add);
