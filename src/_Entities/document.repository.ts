import { Injectable } from '@nestjs/common';
import { PortalRole } from './portal_role.entity';
import { DataSource, Repository } from 'typeorm';
import { Document } from './document.entity';
@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }
}
