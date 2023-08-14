import * as express from "express";
import * as LevelsGuController from "../controllers/LevelsGuController";
import { verify } from "../middleware/verify"

export const routerLevelsGu = express.Router();

routerLevelsGu.get("/getAll", LevelsGuController.getAll);
routerLevelsGu.get("/getAllByHydronode", LevelsGuController.getAllByHydronode);
routerLevelsGu.post("/add", verify("operator"), LevelsGuController.add);
routerLevelsGu.post("/change", verify("operator"), LevelsGuController.change);
routerLevelsGu.delete("/delete/:id", verify("operator"), LevelsGuController.deleteById);
routerLevelsGu.get("/getAllByDate", LevelsGuController.getAllByDate);
routerLevelsGu.get("/getAllByPeriod", LevelsGuController.getAllByPeriod);