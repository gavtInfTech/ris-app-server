import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable } from "typeorm"
import { Site } from "./Site";

@Entity()
export class Notice {
    @PrimaryColumn()
    id: string

    @Column("varchar", { length: 1000 })
    content

    @Column()
    date: Date

    @Column()
    cause1: boolean

    @Column()
    cause2: boolean

    @Column()
    cause3: boolean

    @ManyToOne(() => Site)
    site: Site;
}