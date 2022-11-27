import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Role, ROLES} from "./role.entity";
import {User} from './user.entity'

@Injectable()
export class RoleRepository extends Repository<Role> {
    constructor(private dataSource: DataSource) {
        super(Role, dataSource.createEntityManager());
    }
    hasRole(user: User, role: ROLES) {
        return user.role.name === role;
    }
}