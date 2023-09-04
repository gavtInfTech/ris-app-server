import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Sign } from "./Sign";

@Entity()
export class SignNotice {
    @PrimaryColumn()
    id: string

    @Column()
    date: Date

    @Column()
    comment: string

    @ManyToOne(() => Sign)
    sign: Sign;
}