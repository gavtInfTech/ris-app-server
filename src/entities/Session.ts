import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { River } from "./River";
import { User } from "./User";

@Entity()
export class Session {
    @PrimaryColumn()
    id: string

    @Column()
    inspectior1: string

    @Column()
    inspectior2: string

    @Column()
    inspectior3: string

    @Column()
    inspectior4: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @ManyToOne(type => User)
    user: User

    @ManyToOne(type => River)
    river: River
}