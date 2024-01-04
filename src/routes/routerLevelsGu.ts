import * as express from "express";
import * as LevelsGuController from "../controllers/LevelsGuController";
import { verify } from "../middleware/verify"

export const routerLevelsGu = express.Router();

routerLevelsGu.get("/getAll", LevelsGuController.getAll);
routerLevelsGu.get("/getAllByHydronode", LevelsGuController.getAllByHydronode);
routerLevelsGu.post("/add", verify("Диспетчер"), LevelsGuController.add);
routerLevelsGu.post("/change", verify("Диспетчер"), LevelsGuController.change);
routerLevelsGu.delete("/delete/:id", verify("Диспетчер"), LevelsGuController.deleteById);
routerLevelsGu.get("/getAllByDate", LevelsGuController.getAllByDate);
routerLevelsGu.get("/getAllByPeriod", LevelsGuController.getAllByPeriod);
routerLevelsGu.post("/deleteWithConfirm/:id", LevelsGuController.deleteByIdWithConfirm);