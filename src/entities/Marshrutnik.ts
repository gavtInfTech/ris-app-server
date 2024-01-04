import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { River } from "./River";
import { Site } from "./Site";
import { Characteristic } from "./Characteristic";

@Entity()
export class Marshrutnik {
    @PrimaryColumn()
    id: number

    @Column()
    id_marsh: number

    @Column()
    name: string

    @Column()
    category: string

    @Column()
    shore: string

    @Column()
    distance: string

    @ManyToOne(() => Site)
    @JoinColumn({ name: "site" })
    site: Site;

    @ManyToOne(() => River)
    @JoinColumn({ name: "code_riv" })
    river: River;

    @ManyToOne(() => Characteristic)
    @JoinColumn({ name: "char" })
    Characteristic: Characteristic;
}
