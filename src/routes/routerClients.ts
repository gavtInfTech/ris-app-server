import * as express from "express";
import * as ClientController from "../controllers/ClientController";
import { verify } from "../middleware/verify"

export const routerClients = express.Router();
 
routerClients.post("/registrationClient", ClientController.registration);
routerClients.get("/clients", verify("admin"), ClientController.findAllClients);
routerClients.delete("/delete/:id", verify("admin"), ClientController.deleteClient);
routerClients.post("/change", verify("client"), ClientController.change);