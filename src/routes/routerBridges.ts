import * as express from "express";
import * as BridgeController from "../controllers/BridgeController";
import { verify } from "../middleware/verify"

export const routerBridges = express.Router();

routerBridges.get("/getAllByBridge", BridgeController.getAllByBridge);
routerBridges.post("/add", verify("operator"), BridgeController.add);
routerBridges.post("/change", verify("operator"), BridgeController.change);
routerBridges.delete("/delete/:id", verify("operator"), BridgeController.deleteById);
routerBridges.get("/getAllByDate", BridgeController.getAllByDate);