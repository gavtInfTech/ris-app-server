import * as express from "express";
import * as SessionController from "../controllers/SessionController";
import { verify } from "../middleware/verify"

export const routerSessions = express.Router();

routerSessions.post('/add', SessionController.add);
routerSessions.get("/getByMonth", SessionController.getByMonth);