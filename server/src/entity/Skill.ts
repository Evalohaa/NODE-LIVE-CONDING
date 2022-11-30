// const EntitySchema = require("typeorm").EntitySchema;
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string
}

export default Skill;
