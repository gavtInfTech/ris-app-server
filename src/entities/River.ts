import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm"

@Entity()
export class River {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}