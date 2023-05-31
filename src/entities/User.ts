import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Organisation } from "./Organisation"

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: string

    @ManyToOne(type => Organisation)
    organisation: Organisation
}