import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from './document.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 191, nullable: false })
  lastName: string;
}
