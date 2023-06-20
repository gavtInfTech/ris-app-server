import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany, JoinColumn } from "typeorm"
import { River } from "./River";
import { Notice } from "./Notice";

@Entity()
export class Site {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @ManyToOne(() => River)
    river: River;
}