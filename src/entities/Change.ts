import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Session } from "./Session";

@Entity()
export class Change {
    @PrimaryColumn()
    id: string

    @Column({ nullable: true })
    type: string

    @Column({ nullable: true })
    changedId: string

    @Column()
    date: Date

    @ManyToOne(type => Session)
    session: Session
}