import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Bridge {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    height: number

    @Column()
    date: Date

    @PrimaryColumn({type: 'string', name: 'riverId'})
    @ManyToOne(type => River)
    river: River
}