import * as express from "express";
import * as RollsController from "../controllers/RollsController";

export const routerRolls = express.Router();

routerRolls.get("/getAllRollsBySite", RollsController.getAllRollsBySite);