import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentRole } from "./document_role.entity";
import { User } from "./user.entity";
import { WorkGroup } from "./work_group.entity";

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @ManyToOne(_type => DocumentRole)
    documentRole: DocumentRole;

    @ManyToOne(type => User)
    users: User[];

    @ManyToOne(type => WorkGroup)
    group: WorkGroup[];
}