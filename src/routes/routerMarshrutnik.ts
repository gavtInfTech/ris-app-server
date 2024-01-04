import * as express from "express";
import * as MarshrutnikController from "../controllers/MarshrutnikController"
import { verify } from "../middleware/verify";

export const routerMarshrutnik = express.Router();

routerMarshrutnik.get("/getAll", verify("Путевик"), MarshrutnikController.getAllMarshruts);
routerMarshrutnik.post("/add", verify("Путевик"), MarshrutnikController.add);
routerMarshrutnik.post("/change", verify("Путевик"),  MarshrutnikController.changeMarshrut);
routerMarshrutnik.delete("/delete/:id", verify("Путевик"), MarshrutnikController.deleteMarshrut);