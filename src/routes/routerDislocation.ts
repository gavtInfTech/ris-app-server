import * as express from "express";
import * as DislocationController from "../controllers/DislocationController";
import { verify } from "../middleware/verify";

export const routerDislocation = express.Router();

routerDislocation.get("/getAllByOrganisation", DislocationController.getAllByOrganisation);
routerDislocation.post("/add", verify("Диспетчер"), DislocationController.add);
routerDislocation.post("/change", verify("Диспетчер"), DislocationController.change);
routerDislocation.delete("/delete/:id", verify("Диспетчер"), DislocationController.deleteById);
routerDislocation.get("/getAllByDate", DislocationController.getAllByDate);
routerDislocation.get("/getAllByPeriod", DislocationController.getAllByPeriod);
routerDislocation.post("/deleteWithConfirm/:id", DislocationController.deleteByIdWithConfirm);
