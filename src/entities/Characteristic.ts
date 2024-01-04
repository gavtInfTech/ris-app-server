import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Characteristic {
    @PrimaryColumn()
    id: number

    @Column()
    date: string

    @Column()
    level: string
}
