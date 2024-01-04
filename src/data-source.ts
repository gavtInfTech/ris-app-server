import "reflect-metadata"
import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: "eu-cdbr-west-03.cleardb.net",
//     port: 3306,
//     username: "bee4cf5bbfb96c",
//     password: "57d9e22e",
//     database: "heroku_e88d29a6a936fcf",
//     timezone: '+03:00',
//     synchronize: true,
//     logging: true,
//     entities: ["src/entities/*.ts"],
// })

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432, // PostgreSQL default port
    username: 'postgres',
    password: 'password',
    database: 'rias',

    synchronize: true,
    logging: true,
    entities: ['src/entities/*.ts'],
});


