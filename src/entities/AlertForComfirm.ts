import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class AlertForComfirm {
    @PrimaryColumn()
    id: string

    @Column('double precision')
    latitude: number

    @Column('double precision')
    longitude: number

    @Column()
    comment: string

    @Column({nullable: true})
    date: Date

    @ManyToOne(type => River)
    river: River
}