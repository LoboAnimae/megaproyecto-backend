import { Injectable } from '@nestjs/common';
import { PortalPermission } from './portal_permission.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PortalPermissionRepository extends Repository<PortalPermission> {
  constructor(private dataSource: DataSource) {
    super(PortalPermission, dataSource.createEntityManager());
  }
}
