import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
<<<<<<< HEAD
    type: 'postgres',
    host: 'localhost',
    port: 5432, // PostgreSQL default port
    username: 'postgres',
    password: 'password',
    database: 'rias',

=======
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "17080290",
    database: "investimedp",
  
>>>>>>> 61fbec8379cbdecd4c73ea61d6beea5bd538db67
    synchronize: true,
    logging: true,
    entities: ['src/entities/*.ts'],
});


