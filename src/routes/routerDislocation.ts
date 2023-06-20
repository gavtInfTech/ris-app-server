import * as express from "express";
import * as DislocationController from "../controllers/DislocationController";
import { verify } from "../middleware/verify";

export const routerDislocation = express.Router();

routerDislocation.get("/getAllByOrganisation", DislocationController.getAllByOrganisation);
routerDislocation.post("/add", verify("operator"), DislocationController.add);
routerDislocation.post("/change", verify("operator"), DislocationController.change);
routerDislocation.delete("/delete/:id", verify("operator"), DislocationController.deleteById);
routerDislocation.get("/getAllByDate", DislocationController.getAllByDate);