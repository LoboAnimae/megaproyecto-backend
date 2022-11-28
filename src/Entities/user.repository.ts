import {Injectable} from "@nestjs/common";
import {DataSource, FindOneOptions, Repository} from "typeorm";
import {User} from "./user.entity";

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
}