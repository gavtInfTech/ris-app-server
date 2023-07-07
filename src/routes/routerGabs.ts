import * as express from "express";
import * as GabsController from "../controllers/GabsController";
import { verify } from "../middleware/verify";

export const routerGabs = express.Router();

routerGabs.get("/getAllBySite", GabsController.getAllBySite);
routerGabs.post("/add", verify("operator"), GabsController.add);
routerGabs.post("/change", verify("operator"), GabsController.change);
routerGabs.delete("/delete/:id", verify("operator"), GabsController.deleteById);
routerGabs.get("/getAllByDate", GabsController.getAllByDate);
routerGabs.get("/getAllByPeriod", GabsController.getAllByPeriod);