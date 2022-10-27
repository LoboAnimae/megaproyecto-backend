import { Injectable } from '@nestjs/common';
import { InstitutionType } from './institution_type.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InstitutionTypeRepository extends Repository<InstitutionType> {
  constructor(private dataSource: DataSource) {
    super(InstitutionType, dataSource.createEntityManager());
  }
}
