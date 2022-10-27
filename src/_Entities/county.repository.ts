import { Injectable } from '@nestjs/common';
import { County } from './county.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CountyRepository extends Repository<County> {
  constructor(private dataSource: DataSource) {
    super(County, dataSource.createEntityManager());
  }
}