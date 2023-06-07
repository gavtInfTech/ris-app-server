import * as express from "express";
import * as LevelsGpController from "../controllers/LevelsGpController";
import { verify } from "../middleware/verify"

export const routerLevelsGp = express.Router();
 
routerLevelsGp.get("/getAllByHydropost", LevelsGpController.getAllByHydropost);
routerLevelsGp.post("/add", LevelsGpController.add);
routerLevelsGp.post("/change", verify("operator"), LevelsGpController.change);
routerLevelsGp.delete("/delete/:id", verify("operator"), LevelsGpController.deleteById);
routerLevelsGp.get("/getLevelsByDay", LevelsGpController.getLevelsByDate);