import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany, JoinColumn } from "typeorm"
import { River } from "./River";
import { Notice } from "./Notice";

@Entity()
export class Site {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    accordance: boolean

    @Column('double precision')
    firstKM: number

    @Column('double precision')
    secondKM: number
    
    @ManyToOne(() => River)
    river: River;
}