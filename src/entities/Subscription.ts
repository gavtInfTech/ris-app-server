import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";

@Entity()
export class Subscription {
    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @Column()
    levels: boolean

    @Column()
    notices: boolean

    @Column()
    gabs: boolean

    @Column()
    heights: boolean

    @Column()
    dislocations: boolean

    @ManyToOne(type => River)
    river: River
}