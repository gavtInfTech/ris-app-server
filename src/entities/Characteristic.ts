import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Characteristic {
    @PrimaryColumn()
    id: string

    @Column()
    date: Date

    @Column()
    level: string

}