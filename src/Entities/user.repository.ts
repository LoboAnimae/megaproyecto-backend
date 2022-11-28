import {Injectable} from "@nestjs/common";
import {DataSource, FindOneOptions, Repository} from "typeorm";
import {User} from "./user.entity";
import {Institution} from "./institution.entity";
import {Document} from "./document.entity";
import {Role} from "./role.entity";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    #findOne(searchObject: FindOneOptions<User>): Promise<User | null> {
        return this.dataSource.getRepository(User).findOne(searchObject);
    }


    findByUsername(username: string, options?: FindOneOptions<User>): Promise<User | null> {
        return this.#findOne({...options, where: {username}});
    }

    findById(id: number, options?: FindOneOptions<User>): Promise<User | null> {
        return this.#findOne({...options, where: {id}});
    }

    async getUserInstitution(user: User): Promise<Institution> {

        return user.institution ?? (await this.findById(user.id, {relations: ['institution']})).institution;
    }

    async getUserDocuments(user: User): Promise<Document[]> {
        return user.documents ?? (await this.findById(user.id, {relations: ['documents']})).documents;
    }

    async getUserRole(user: User): Promise<Role> {
        return user.role ?? (await this.findById(user.id, {relations: ['role']})).role;
    }
}