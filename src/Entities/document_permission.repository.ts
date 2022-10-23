import { Injectable } from '@nestjs/common';
import { DocumentPermission } from 'src/Entities/document_permission.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocumentPermissionRepository extends Repository<DocumentPermission> {
  constructor(private dataSource: DataSource) {
    super(DocumentPermission, dataSource.createEntityManager());
  }
}
