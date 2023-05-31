import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Site {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @PrimaryColumn({type: 'string', name: 'riverId'})
    @ManyToOne(type => River)
    river: River
}