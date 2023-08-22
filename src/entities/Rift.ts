import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Rift {
    @PrimaryColumn()
    id: string

    @Column()
    image: string

    @Column('double precision')
    latitude: number

    @Column('double precision')
    longitude: number

    @Column()
    currentWaterLevel: string

    @Column()
    waterLevel: string

    @Column()
    description: string

    @ManyToOne(type => River)
    river: River
}