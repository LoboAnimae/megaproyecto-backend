import { Injectable } from '@nestjs/common';
import { CommentType } from 'src/Entities/comment_type.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentTypeRepository extends Repository<CommentType> {
  constructor(private dataSource: DataSource) {
    super(CommentType, dataSource.createEntityManager());
  }
}
