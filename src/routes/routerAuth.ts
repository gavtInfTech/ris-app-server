import * as express from "express";
import * as UserController from "../controllers/UserController";
import { verify } from "../middleware/verify"

export const routerAuth = express.Router();
 
routerAuth.post("/login", UserController.login);
routerAuth.post("/registration", verify("admin"), UserController.registration);
routerAuth.get("/getAllUsers", verify("admin"), UserController.getAllUsers);
routerAuth.delete("/delete/:id", verify("admin"), UserController.deleteUser);
routerAuth.post("/change", verify("admin"), UserController.changeUser);
routerAuth.get("/authCheck", UserController.authCheck);
routerAuth.get("/logout", UserController.logout);