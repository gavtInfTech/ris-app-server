import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Sign {
    @PrimaryColumn()
    id: string

    @Column()
    image: string

    @Column('double precision')
    latitude: number

    @Column('double precision')
    longitude: number

    @Column()
    color: boolean

    @Column()
    place: boolean

    @Column()
    size: boolean

    @Column()
    visibility: boolean

    @Column('double precision', { nullable: true })
    kilometrage: number

    @Column()
    description: string

    @ManyToOne(type => River)
    river: River
}