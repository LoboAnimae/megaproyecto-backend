import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { User } from './user.entity';
import { Document } from './document.entity';
import { UserWorkGroup } from './user_work_group.entity';

@Entity()
export class WorkGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @ManyToOne((_type) => Institution)
  institutionId: Institution;

  @ManyToOne((_type) => Document)
  document: Document;
}
