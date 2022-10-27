import { Injectable } from '@nestjs/common';
import { PortalRole } from './portal_role.entity';
import { State } from './state.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StateRepository extends Repository<State> {
  constructor(private dataSource: DataSource) {
    super(State, dataSource.createEntityManager());
  }
}
