import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Client {
    @PrimaryColumn()
    id: string

    @Column()
    fio: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    confirmed: boolean
}