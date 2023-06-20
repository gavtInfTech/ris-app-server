import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class LevelGu {
    @PrimaryColumn()
    id: string

    @Column()
    hydronode: string

    @Column()
    level1: string

    @Column()
    level2: string

    @Column()
    date: Date

    @ManyToOne(type => River)
    river: River
}