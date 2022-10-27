import { Injectable } from '@nestjs/common';
import { PortalRole } from './portal_role.entity';
import { UserWorkGroup } from './user_work_group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserWorkGroupRepository extends Repository<UserWorkGroup> {
  constructor(private dataSource: DataSource) {
    super(UserWorkGroup, dataSource.createEntityManager());
  }
}
