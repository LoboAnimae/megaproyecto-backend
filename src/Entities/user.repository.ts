import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  findByUsername(username: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOne({ where: { username } });
  }

  findById(id: number): Promise<User | null> {
    return this.dataSource.getRepository(User).findOne({ where: { id } });
  }
}
