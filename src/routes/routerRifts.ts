import * as express from "express";
import * as RiftController from "../controllers/RiftController";
import { verify } from "../middleware/verify"

export const routerRifts = express.Router();

routerRifts.get("/getAll", RiftController.getAll);
routerRifts.post("/change", RiftController.change);