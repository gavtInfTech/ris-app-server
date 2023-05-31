import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class LevelGu {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    level1: string

    @Column()
    level2: string

    @Column()
    date: Date

    @PrimaryColumn({type: 'string', name: 'riverId'})
    @ManyToOne(type => River)
    river: River
}