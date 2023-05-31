import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "eu-cdbr-west-03.cleardb.net",
    port: 3306,
    username: "ba27bab06bf954",
    password: "e76f6afb",
    database: "heroku_d02cb3b85b0108d",
    timezone: '+03:00',
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
})
// mysql://ba27bab06bf954:e76f6afb@eu-cdbr-west-03.cleardb.net/heroku_d02cb3b85b0108d?reconnect=true