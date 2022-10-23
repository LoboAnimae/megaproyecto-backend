import { Injectable } from '@nestjs/common';
import { PortalRole } from 'src/Entities/portal_role.entity';
import { UserWorkGroup } from 'src/Entities/user_work_group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserWorkGroupRepository extends Repository<UserWorkGroup> {
  constructor(private dataSource: DataSource) {
    super(UserWorkGroup, dataSource.createEntityManager());
  }
}
