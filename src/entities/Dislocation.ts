import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";
import { Organisation } from "./Organisation";

@Entity()
export class Dislocation {
    @PrimaryColumn()
    id: string

    @Column()
    number: string

    @Column()
    distance: string

    @Column()
    date: Date

    @Column()
    place: string

    @Column()
    typeOfWork: string

    @Column()
    riverName: string

    @ManyToOne(type => Organisation)
    organisation: Organisation

    @Column({ nullable: true })
    typeOfChange: string

    @Column({ nullable: true })
    confirmation: boolean
}