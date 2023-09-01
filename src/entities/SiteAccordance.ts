import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Site } from "./Site";

@Entity()
export class SiteAccordance {
    @PrimaryColumn()
    id: string

    @Column()
    date: Date

    @Column()
    accordance: boolean

    @ManyToOne(() => Site)
    site: Site;
}