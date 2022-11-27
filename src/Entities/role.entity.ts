import {Entity, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {IdAndName} from "./singular";
import {User} from "./user.entity";
import {Permission} from "./permission.entity";
import {UserGroup} from "./user_group.entity";

export enum ROLES {
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student'
}

/**
 * A role is a set of permissions that a user can have. A user can ONLY have one role at a time.
 * Obviously, a role can only be changed by an admin.
 * Originally, each role was going to have a set of permissions to allow for more granular control, **but this was scrapped for database control**.
 * For security purposes, the role is better managed inside the code, rather than outside it. _This also allows for fewer bugs_.
 */
@Entity()
export class Role extends IdAndName({primaryColumnType: 'integer'}) {
    @OneToMany(() => User, user => user.role)
    users: User[];

    @ManyToMany(() => Permission)
    @JoinTable({name: 'role_permission'})
    permissions: Permission[];

    @OneToMany(_type => UserGroup, userGroup => userGroup.role)
    userGroups: UserGroup[];
}