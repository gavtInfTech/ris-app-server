import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Site } from "./Site";

@Entity()
export class Gab {
    @PrimaryColumn()
    id: string

    @Column({ nullable: true })
    depth: string

    @Column({ nullable: true })
    width: string

    @Column({ nullable: true })
    limitedRoll: string

    @Column({ nullable: true })
    planDepth: number

    @Column()
    date: Date
    
    @Column({ nullable: true })
    forecastDepth: string

    @Column({ nullable: true })
    forecastDate: Date

    @ManyToOne(type => Site, { onDelete: 'CASCADE' })
    site: Site

    @Column({ nullable: true })
    typeOfChange: string

    @Column({ nullable: true })
    confirmation: boolean
}