import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class DocumentPermission {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 191, nullable: false, unique: true })
    name: string;

    @ManyToMany(type => User)
    users: User[];
}