import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, IntegerType } from "typeorm"
import { Site } from "./Site";

@Entity()
export class River {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}