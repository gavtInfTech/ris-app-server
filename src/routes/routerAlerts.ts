import * as express from "express";
import * as AlertController from "../controllers/AlertController";
import { verify } from "../middleware/verify"

export const routerAlerts = express.Router();

routerAlerts.get("/getAll", AlertController.getAll);
routerAlerts.get("/add", AlertController.add);
routerAlerts.get("/change", AlertController.change);
routerAlerts.get("/delete/:id", AlertController.deleteById);