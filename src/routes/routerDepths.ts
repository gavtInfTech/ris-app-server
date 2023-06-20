import * as express from "express";
import * as DepthController from "../controllers/DepthController";
import { verify } from "../middleware/verify";

export const routerDepths = express.Router();

routerDepths.get("/getAllBySite", DepthController.getAllBySite);
routerDepths.post("/add", verify("operator"), DepthController.add);
routerDepths.post("/change", verify("operator"), DepthController.change);
routerDepths.delete("/delete/:id", verify("operator"), DepthController.deleteById);
routerDepths.get("/getAllByDate", DepthController.getAllByDate);