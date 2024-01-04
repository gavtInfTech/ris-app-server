import * as express from "express";
import * as ConfirmsController from "../controllers/ConfirmsController";
import { verify } from "../middleware/verify"

export const routerConfirms = express.Router();
 
routerConfirms.post("/confirmAdd", ConfirmsController.confirmAdd);
routerConfirms.post("/confirmChange", ConfirmsController.confirmChange);
routerConfirms.post("/confirmDelete", ConfirmsController.confirmDelete);
routerConfirms.get("/getAll", verify("admin"), ConfirmsController.getAllUnconfirmedData);
routerConfirms.delete("/reject/:id", verify("admin"), ConfirmsController.reject);