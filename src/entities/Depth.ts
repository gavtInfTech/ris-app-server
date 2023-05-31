import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Site } from "./Site";

@Entity()
export class Depth {
    @PrimaryColumn()
    id: string

    @Column()
    depth: number

    @Column()
    width: number

    @Column()
    limitedRoll: number

    @Column()
    planDepth: number

    @Column()
    date: Date
    
    @Column()
    forecastDepth: number

    @Column()
    forecastDate: Date

    @PrimaryColumn({type: 'string', name: 'siteId'})
    @ManyToOne(type => Site)
    site: Site
}