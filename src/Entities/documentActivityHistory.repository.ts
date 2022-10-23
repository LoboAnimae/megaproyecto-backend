import { Injectable } from '@nestjs/common';
import { DocumentActivityHistory } from 'src/Entities/documentActivityHistory.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocumentActivityHistoryRepository extends Repository<DocumentActivityHistory> {
  constructor(private dataSource: DataSource) {
    super(DocumentActivityHistory, dataSource.createEntityManager());
  }
}
