import * as express from "express";
import * as ChangeController from "../controllers/ChangeController";
import { verify } from "../middleware/verify";

export const routerChanges = express.Router();

routerChanges.post("/add", ChangeController.add);
routerChanges.get("/getBySession", ChangeController.getBySession);
routerChanges.get("/getSiteChangesBySession", ChangeController.getSiteChangesBySession);