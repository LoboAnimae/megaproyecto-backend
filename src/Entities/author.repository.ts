import { Injectable } from '@nestjs/common';
import { Author } from 'src/Entities/author.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(private dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }
}
