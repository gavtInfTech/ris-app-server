import express from "express"; 
import path from "path";
import cors from 'cors';
import { AppDataSource } from "./data-source";
import cookieParser from "cookie-parser";
import {routerAuth} from "./routes/routerAuth";
import {routerClients} from "./routes/routerClients";
import {routerLevelsGp} from "./routes/routerLevelsGp";
import {routerLevelsGu} from "./routes/routerLevelsGu";
import {routerGabs} from "./routes/routerGabs";
import {routerBridges} from "./routes/routerBridges";
import {routerDislocation} from "./routes/routerDislocation";
import {routerNotices} from "./routes/routerNotices";
import {routerSib} from "./routes/routerSib";
import {routerSigns} from "./routes/routerSigns";
import {routerRifts} from "./routes/routerRifts";
import {routerAlerts} from "./routes/routerAlerts";
import {routerSessions} from "./routes/routerSessions";
import {routerSites} from "./routes/routerSites";
import {routerSiteAccordances} from "./routes/routerSiteAccordances";
import {routerSignNotices} from "./routes/routerSignNotices";
import { routerMarshrutnik } from "./routes/routerMarshrutnik";
import { routerRolls } from "./routes/routerRolls";
import { routerConfirms } from "./routes/routerConfirms";
import helmet from 'helmet';
import rateLimit from "express-rate-limit";

const http = require('http');
const https = require('https');
const fs = require('fs');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 1000, // максимальное количество запросов
  message: "Too many requests from this IP, please try again later.",
});

const startServer = async () => {
    try {
      await AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    })
  
      const app = express();
      app.use(helmet());
      app.use(helmet.hidePoweredBy()); // Remove X-Powered-By header
      app.use(helmet.frameguard({ action: 'deny' })); // Prevent Clickjacking attacks
      app.use(helmet.xssFilter()); // Enable XSS protection
      app.use(helmet.noSniff()); // Prevent browsers from interpreting files as something else
      app.use(
        helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'","https://docs.google.com", "https://yandex.ru","https://yandex.ru/maps/"], // Разрешено только загружать ресурсы с текущего домена
            scriptSrc: ["'self'", "'unsafe-inline'", "https://api-maps.yandex.ru", "https://www.gstatic.com/charts/loader.js","https://yastatic.net/s3/","https://yandex.ru/clck/counter","https://api-maps.yandex.ru ","https://www.gstatic.com","https://yastatic.net/s3/","https://core-renderer-tiles.maps.yandex.net/tiles","https://yandex.ru/clck/counter/"],
            imgSrc: ["'self'", "data:", "https://api-maps.yandex.ru", "https://core-renderer-tiles.maps.yandex.net/", "https://yandex.ru/", "https://core-renderer-tiles.maps.yandex.net/","https://yandex.ru/clck/counter","https://api-maps.yandex.ru ","https://www.gstatic.com/charts/loader.js","https://yastatic.net/s3/","https://yandex.ru/clck/counter/"],
            // Другие директивы, такие как styleSrc, imgSrc и т.д.
          },
        })
      );
      app.use(limiter);
      app.use(express.json());
      app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8000', 'http://192.168.1.67:3000', 'https://178.124.171.122', 'https://rias.by'],
        credentials: true,
      }));
      app.use(cookieParser());

      app.use("/api/auth", routerAuth);
      app.use("/api/clients", routerClients);
      app.use("/api/levelsGp", routerLevelsGp);
      app.use("/api/levelsGu", routerLevelsGu);
      app.use("/api/gabs", routerGabs);
      app.use("/api/bridges", routerBridges);
      app.use("/api/dislocation", routerDislocation);
      app.use("/api/notices", routerNotices);
      app.use("/api/sib", routerSib);
      app.use("/api/signs", routerSigns);
      app.use("/api/rifts", routerRifts);
      app.use("/api/alerts", routerAlerts);
      app.use("/api/sessions", routerSessions);
      app.use("/api/sites", routerSites);
      app.use("/api/siteAccordances", routerSiteAccordances);
      app.use("/api/signNotices", routerSignNotices);
      app.use("/api/marshrutnik", routerMarshrutnik);
      app.use("/api/rolls", routerRolls)
      app.use("/api/confirmation", routerConfirms )
      app.use(express.static(path.join('C:/Users/Администратор/RIAS/ris-app-client/build')));
      app.get('*', (req, res) => {
        res.sendFile(path.join('C:/Users/Администратор/RIAS/ris-app-client/build/index.html'));
      });
      
      const server = http.createServer( app).listen(3000, 'localhost', () => {
        console.log("Connected!");
      });

      return server; 
    } catch (err) {
      console.error("Error during Server initialization:", err);
    }
  };

  
  startServer();

  export default startServer;
