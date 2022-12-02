import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Grade from "./Grade";
// import Skill from "./Skill"

@Entity()
class Wilder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    avatarUrl?: string;

    @OneToMany(() => Grade, grade => grade.wilder)
    grades: Grade[]
}

export default Wilder;
