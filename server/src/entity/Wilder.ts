import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Skill from "./Skill"

@Entity()
class Wilder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Skill, {eager: true})
    @JoinTable()
    skills: Skill[]
}

export default Wilder;
