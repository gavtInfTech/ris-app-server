import * as express from "express";
import * as NoticeController from "../controllers/NoticeController";
import { verify } from "../middleware/verify";

export const routerNotices = express.Router();

routerNotices.get("/getAll", NoticeController.getAll);
routerNotices.post("/add", verify("operator"), NoticeController.add);
routerNotices.post("/change", verify("operator"), NoticeController.change);
routerNotices.delete("/delete/:id", verify("operator"), NoticeController.deleteById);
routerNotices.get("/getAllByDay", NoticeController.getAllByDate);