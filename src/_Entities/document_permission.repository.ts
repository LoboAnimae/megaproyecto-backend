import { Injectable } from '@nestjs/common';
import { DocumentPermission } from './document_permission.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocumentPermissionRepository extends Repository<DocumentPermission> {
  constructor(private dataSource: DataSource) {
    super(DocumentPermission, dataSource.createEntityManager());
  }
}
