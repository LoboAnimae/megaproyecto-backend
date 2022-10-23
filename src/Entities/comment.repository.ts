import { Injectable } from '@nestjs/common';
import { Comment } from 'src/Entities/comment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
