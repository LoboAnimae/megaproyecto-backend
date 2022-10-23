import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.entity';
@Entity()
export class Document {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({
    type: 'char',
    length: 36,
    nullable: false,
    default: () => 'UUID()',
  })
  uuid: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  name: string;

  @Column({ type: 'json' })
  metadata: string;

  @ManyToMany((_type) => Author)
  @JoinTable()
  authors: Author[];
}
