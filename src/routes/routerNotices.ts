import * as express from "express";
import * as NoticeController from "../controllers/NoticeController";
import { verify } from "../middleware/verify";

export const routerNotices = express.Router();

routerNotices.get("/getAll", NoticeController.getAll);
routerNotices.post("/add", verify("Диспетчер"), NoticeController.add);
routerNotices.post("/change", verify("Диспетчер"), NoticeController.change);
routerNotices.delete("/delete/:id", verify("Диспетчер"), NoticeController.deleteById);
routerNotices.get("/getAllByDate", NoticeController.getAllByDate);
routerNotices.get("/getAllByPeriod", NoticeController.getAllByPeriod);
routerNotices.get("/getCurrentNotices", NoticeController.getCurrentNotices);