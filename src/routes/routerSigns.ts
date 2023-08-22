import * as express from "express";
import * as SignController from "../controllers/SignController";
import { verify } from "../middleware/verify"

export const routerSigns = express.Router();

routerSigns.get("/getAll", verify('Путевик'), SignController.getAll);