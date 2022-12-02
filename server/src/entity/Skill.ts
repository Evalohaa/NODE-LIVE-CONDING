// const EntitySchema = require("typeorm").EntitySchema;
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import Grade from "./Grade";

@Entity()
class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @OneToMany(() => Grade, grade => grade.skill)
    grades: Grade[];
}

export default Skill;
