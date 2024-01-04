import * as express from "express";
import * as LevelsGpController from "../controllers/LevelsGpController";
import { verify } from "../middleware/verify"

export const routerLevelsGp = express.Router();
 
routerLevelsGp.get("/getAll", LevelsGpController.getAll);
routerLevelsGp.get("/getAllByHydropost", LevelsGpController.getAllByHydropost);
routerLevelsGp.post("/add", verify("Диспетчер"), LevelsGpController.add);
routerLevelsGp.post("/change", verify("Диспетчер"), LevelsGpController.change);
routerLevelsGp.delete("/delete/:id", verify("Диспетчер"), LevelsGpController.deleteById);
routerLevelsGp.get("/getAllByDate", LevelsGpController.getAllByDate);
routerLevelsGp.get("/getAllByPeriod", LevelsGpController.getAllByPeriod);
routerLevelsGp.get("/getAllByPeriodAndRiver", LevelsGpController.getAllByPeriodAndRiver);
routerLevelsGp.post("/deleteWithConfirm/:id", LevelsGpController.deleteByIdWithConfirm);