import * as express from "express";
import * as SiteController from "../controllers/SiteController";
import { verify } from "../middleware/verify"

export const routerSites = express.Router();

routerSites.get("/getAll", SiteController.getAll);
routerSites.get("/getAllByRiver", SiteController.getAllByRiver);
routerSites.post("/add", SiteController.add);
routerSites.post("/change", SiteController.change);
routerSites.delete("/delete/:id", SiteController.deleteById);