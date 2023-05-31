import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Organisation {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string 
}