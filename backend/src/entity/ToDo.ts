import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ToDo {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({default: null})
    task: string
}
