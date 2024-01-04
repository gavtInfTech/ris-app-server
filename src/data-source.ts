import "reflect-metadata"
import { DataSource } from "typeorm"


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


