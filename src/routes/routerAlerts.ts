import * as express from "express";
import * as AlertController from "../controllers/AlertController";
import { verify } from "../middleware/verify"

export const routerAlerts = express.Router();

routerAlerts.get("/getAll", AlertController.getAll);
routerAlerts.post("/add", AlertController.add);
routerAlerts.post("/change", AlertController.change);
routerAlerts.delete("/delete/:id", AlertController.deleteById);