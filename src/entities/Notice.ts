import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Site } from "./Site";

@Entity()
export class Notice {
    @PrimaryColumn()
    id: string

    @Column()
    content: string

    @Column()
    date: Date

    @Column()
    cause1: boolean

    @Column()
    cause2: boolean

    @Column()
    cause3: boolean

    @PrimaryColumn({type: 'string', name: 'siteId'})
    @ManyToOne(type => Site)
    site: Site
}