import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class LevelGp {
    @PrimaryColumn()
    id: string

    @Column()
    hydropost: string

    @Column()
    level1: string

    @Column()
    level2: string

    @Column()
    difference: string

    @Column()
    date: Date

    @ManyToOne(type => River)
    river: River
    
    @Column({ nullable: true })
    typeOfChange: string

    @Column({ nullable: true })
    confirmation: boolean
}