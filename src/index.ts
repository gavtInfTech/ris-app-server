import express from "express"; 
import path from "path";
import cors from 'cors';
import { AppDataSource } from "./data-source"
import cookieParser from "cookie-parser";
import {routerAuth} from "./routes/routerAuth";
import {routerClients} from "./routes/routerClients"
import {routerLevelsGp} from "./routes/routerLevelsGp"
import {routerLevelsGu} from "./routes/routerLevelsGu"
import {routerGabs} from "./routes/routerGabs"
import {routerBridges} from "./routes/routerBridges"
import {routerDislocation} from "./routes/routerDislocation"
import {routerNotices} from "./routes/routerNotices"
import {routerSib} from "./routes/routerSib"
const http = require('http');

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
  
      app.use("/api/auth", routerAuth);
      app.use("/api/client", routerClients);
      app.use("/api/levelsGp", routerLevelsGp);
      app.use("/api/levelsGu", routerLevelsGu);
      app.use("/api/gabs", routerGabs);
      app.use("/api/bridges", routerBridges);
      app.use("/api/dislocation", routerDislocation);
      app.use("/api/notices", routerNotices);
      app.use("/api/sib", routerSib);
  
      app.use(express.static(path.join('C:/Users/Ivan/ris-app/client/build')));
      app.get('*', (req, res) => {
        res.sendFile(path.join('C:/Users/Ivan/ris-app/client/build/index.html'));
      });

      const server = http.createServer(app).listen(80, '192.168.1.67', () => {
        console.log("Connected!");
        
      });

      return server; 
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
    }
  };

  
  startServer();

  export default startServer;
