import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Session } from "./Session";

@Entity()
export class Change {
    @PrimaryColumn()
    id: string

    @Column()
    type: string

    @Column()
    changedId: string

    @ManyToOne(type => Session)
    session: Session
}