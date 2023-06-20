import express from "express"; 
import cors from 'cors';
import { AppDataSource } from "./data-source"
import cookieParser from "cookie-parser";
import {routerAuth} from "./routes/routerAuth";
import {routerLevelsGp} from "./routes/routerLevelsGp"
import {routerLevelsGu} from "./routes/routerLevelsGu"
import {routerDepths} from "./routes/routerDepths"
import {routerBridges} from "./routes/routerBridges"
import {routerDislocation} from "./routes/routerDislocation"
import {routerNotices} from "./routes/routerNotices"
import {routerSib} from "./routes/routerSib"

const startServer = async () => {
    try {
      await AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
  
      const app = express();
      app.use(express.json());
      app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.1.67:3000'],
        credentials: true,
      }));
      app.use(cookieParser());
  
      app.use("/auth", routerAuth);
      app.use("/levelsGp", routerLevelsGp);
      app.use("/levelsGu", routerLevelsGu);
      app.use("/depth", routerDepths);
      app.use("/bridges", routerBridges);
      app.use("/dislocation", routerDislocation);
      app.use("/notice", routerNotices);
      app.use("/sib", routerSib);
  
      const server = app.listen(8080, () => {
        console.log("Connected!");
      });
  
      return server; 
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
    }
  };

  
  startServer();

  export default startServer;
