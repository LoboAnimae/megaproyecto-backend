import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";


/**
 * Table that allows for relations between users and groups, with some extra information.
 */
@Entity()
export class UserGroup {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @ManyToOne(type => User, User => User.userGroups)
    associatedUser: User;

    @ManyToOne(type => Group, Group => Group.userGroups)
    associatedGroup: Group;

    @Column({ type: 'char', length: 6, default: 'ffffff' })
    studentColor: string;
}