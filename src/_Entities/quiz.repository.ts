import { Injectable } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { PortalRole } from './portal_role.entity';

@Injectable()
export class QuizRepository extends Repository<Quiz> {
  constructor(private dataSource: DataSource) {
    super(Quiz, dataSource.createEntityManager());
  }
}
