import * as express from "express";
import * as SignNoticeController from "../controllers/SignNoticeController";
import { verify } from "../middleware/verify";

export const routerSignNotices = express.Router();

routerSignNotices.post("/add", SignNoticeController.add);
routerSignNotices.get("/getAllByPeriodAndRiver", SignNoticeController.getAllByPeriodAndRiver);
routerSignNotices.get("/getAll", SignNoticeController.getAll);