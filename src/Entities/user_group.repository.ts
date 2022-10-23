import { Injectable } from '@nestjs/common';
import { UserGroup } from 'src/Entities/user_group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserGroupRepository extends Repository<UserGroup> {
  constructor(private dataSource: DataSource) {
    super(UserGroup, dataSource.createEntityManager());
  }
}
