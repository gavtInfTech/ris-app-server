import * as express from "express";
import * as BridgeController from "../controllers/BridgeController";
import { verify } from "../middleware/verify"

export const routerBridges = express.Router();

routerBridges.get("/getAllByBridge", BridgeController.getAllByBridge);
routerBridges.post("/add", verify("Диспетчер"), BridgeController.add);
routerBridges.post("/change", verify("Диспетчер"), BridgeController.change);
routerBridges.delete("/delete/:id", verify("Диспетчер"), BridgeController.deleteById);
routerBridges.get("/getAllByDate", BridgeController.getAllByDate);
routerBridges.get("/getAllByPeriod", BridgeController.getAllByPeriod);
routerBridges.get("/getLastBridgeGabs", BridgeController.getLast);
routerBridges.post("/deleteWithConfirm/:id", BridgeController.deleteByIdWithConfirm);