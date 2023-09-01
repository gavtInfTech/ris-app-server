import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Alert {
    @PrimaryColumn()
    id: string

    @Column('double precision')
    latitude: number

    @Column('double precision')
    longitude: number

    @Column()
    comment: string

    @Column()
    date: Date

    @ManyToOne(type => River)
    river: River
}