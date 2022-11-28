import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Group} from './group.entity';
import {User} from './user.entity';
import {Role} from './role.entity';


/**
 * Table that allows for relations between users and groups, with some extra information.
 */
@Entity()
export class UserGroup {

    @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
    id: number;

    @ManyToOne(_type => User, User => User.userGroups)
    associatedUser: User;

    @ManyToOne(_type => Group, Group => Group.userGroups)
    associatedGroup: Group;

    @Column({type: 'char', length: 6, default: 'ffffff'})
    studentColor: string;

    @ManyToOne(_type => Role, role => role.userGroups)
    role: Role;

    @Column({type: 'char', length: 36})
    uuid: string;
}