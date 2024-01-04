import * as express from "express";
import * as GabsController from "../controllers/GabsController";
import { verify } from "../middleware/verify";

export const routerGabs = express.Router();

routerGabs.get("/getAllBySite", GabsController.getAllBySite);
routerGabs.post("/add", verify("Диспетчер"), GabsController.add);
routerGabs.post("/change", verify("Диспетчер"), GabsController.change);
routerGabs.delete("/delete/:id", verify("Диспетчер"), GabsController.deleteById);
routerGabs.get("/getAllByDate", GabsController.getAllByDate);
routerGabs.get("/getAllByPeriod", GabsController.getAllByPeriod);
routerGabs.get("/getAllByPeriodAndRiver", GabsController.getAllByPeriodAndRiver);
routerGabs.post("/deleteWithConfirm/:id", GabsController.deleteByIdWithConfirm);
