import { Injectable } from '@nestjs/common';
import { WorkGroup } from './work_group.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkGroupRepository extends Repository<WorkGroup> {
  constructor(private dataSource: DataSource) {
    super(WorkGroup, dataSource.createEntityManager());
  }
}
