import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {Exam} from './exam.entity';

@Injectable()
export class ExamRepository extends Repository<Exam> {
    constructor(private dataSource: DataSource) {
        super(Exam, dataSource.createEntityManager());
    }
}