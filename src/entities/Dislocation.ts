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

    @PrimaryColumn({type: 'string', name: 'riverId'})
    @ManyToOne(type => River)
    river: River

    @PrimaryColumn({type: 'string', name: 'organisationId'})
    @ManyToOne(type => Organisation)
    organisation: Organisation
}