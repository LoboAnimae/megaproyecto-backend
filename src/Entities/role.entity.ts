import { Column, Entity, OneToMany } from "typeorm";
import { IdAndName } from "./singular";
import { User } from "./user.entity";


/**
 * @deprecated
 */
export enum PERMISSIONS {
    CREATE_DOCUMENTS = 1 << 0, // Create documents at an institution level
    DELETE_DOCUMENTS = 1 << 1, // Delete documents at an institution level. 

}

/**
 * 
 * @param fromRole 
 * @param asPermission 
 * @returns 
 * @deprecated
 */
export function hasPermission(fromRole: number, asPermission: PERMISSIONS) {
    return !!(fromRole & asPermission);
}


/**
 * A role is a set of permissions that a user can have. A user can ONLY have one role at a time.
 * Obviously, a role can only be changed by an admin.
 * Originally, each role was going to have a set of permissions to allow for more granular control, **but this was scrapped**.
 * For security purposes, the role is better managed inside the code, rather than outside of it. _This also allows for less bugs_.
 */
@Entity()
export class Role extends IdAndName({ primaryColumnType: 'integer' }) {
    @OneToMany(() => User, user => user.role)
    users: User[];

    @Column({ type: 'tinyint', nullable: false, default: 0 })
    permissions: number;
}