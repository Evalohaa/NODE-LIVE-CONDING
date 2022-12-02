import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm"
import Wilder from "./Wilder"
import Skill from "./Skill"

@Entity()
class Grade {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1})
    votes: number

    @Column()
    wilderId: number

    @Column()
    skillId: number

    @ManyToOne(() => Wilder, wilder => wilder.grades)
    wilder: Wilder;

    @ManyToOne(() => Skill, skill => skill.grades)
    skill: Skill;

}

  export default Grade;
