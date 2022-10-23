import { Injectable } from '@nestjs/common';
import { Country } from 'src/Entities/country.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CountryRepository extends Repository<Country> {
  constructor(private dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }
}
