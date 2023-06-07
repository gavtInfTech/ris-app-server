import * as express from "express";
import * as BridgesController from "../controllers/BridgesController";
import { verify } from "../middleware/verify"

export const routerBridges = express.Router();

routerBridges.get("/getAllByBridge", BridgesController.getAllByBridge);
routerBridges.post("/add", BridgesController.add);
routerBridges.post("/change", verify("operator"), BridgesController.change);
routerBridges.delete("/delete/:id", verify("operator"), BridgesController.deleteById);
routerBridges.get("/getLevelsByDay", BridgesController.getLevelsByDate);