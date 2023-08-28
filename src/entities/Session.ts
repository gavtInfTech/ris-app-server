import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";
import { User } from "./User";

@Entity()
export class Session {
    @PrimaryColumn()
    id: string

    @Column()
    inspector1: string

    @Column()
    inspector2: string

    @Column()
    inspector3: string

    @Column()
    inspector4: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @ManyToOne(type => User)
    user: User

    @ManyToOne(type => River)
    river: River
}