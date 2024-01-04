import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Sign } from "./Sign";
import { Session } from "./Session"; 

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

    @ManyToOne(() => Session)  // Добавлено поле связи с сессией
    session: Session;
}