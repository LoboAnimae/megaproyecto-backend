import {Injectable} from '@nestjs/common';
import {DataSource, FindOneOptions, Repository} from 'typeorm';
import {UserGroup} from './user_group.entity';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
    constructor(private dataSource: DataSource) {
        super(UserGroup, dataSource.createEntityManager());
    }

    #findOne(searchObject: FindOneOptions<UserGroup>) {
        return this.dataSource.getRepository(UserGroup).findOne(searchObject);
    }

    findByUUID(uuid: string, options?: FindOneOptions<UserGroup>): Promise<UserGroup | null> {
        return this.#findOne({...options, where: {uuid}});
    }
}
