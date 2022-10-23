import { Injectable } from '@nestjs/common';
import { InstitutionType } from 'src/Entities/institution_type.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InstitutionTypeRepository extends Repository<InstitutionType> {
  constructor(private dataSource: DataSource) {
    super(InstitutionType, dataSource.createEntityManager());
  }
}
