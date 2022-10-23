import { Injectable } from '@nestjs/common';
import { DocumentRole } from 'src/Entities/document_role.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocumentRoleRepository extends Repository<DocumentRole> {
  constructor(private dataSource: DataSource) {
    super(DocumentRole, dataSource.createEntityManager());
  }
}
