import {Injectable} from '@nestjs/common';
import {DataSource, FindOneOptions, Repository} from 'typeorm';
import {Group} from './group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
    constructor(private dataSource: DataSource) {
        super(Group, dataSource.createEntityManager());
    }

    #findOne(searchObject: FindOneOptions<Group>) {
        return this.dataSource.getRepository(Group).findOne(searchObject);
    }

    findByName(name: string, options?: FindOneOptions<Group>): Promise<Group | null> {
        return this.#findOne({where: {name}, ...options});
    }

    findById(id: number, options?: FindOneOptions<Group>): Promise<Group | null> {
        return this.#findOne({where: {id}, ...options});
    }

    findByUUID(uuid: string, options?: FindOneOptions<Group>): Promise<Group | null> {
        return this.#findOne({...options, where: {uuid}});
    }
}