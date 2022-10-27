import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
// @Unique(['username', 'institution'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  username: string;

  @Column({ type: 'binary', length: 60, nullable: false })
  password: string;
}
