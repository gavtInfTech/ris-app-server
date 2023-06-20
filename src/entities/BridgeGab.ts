import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class BridgeGab {
    @PrimaryColumn()
    id: string

    @Column()
    bridge: string

    @Column()
    height: number

    @Column()
    date: Date

    @ManyToOne(type => River)
    river: River
}