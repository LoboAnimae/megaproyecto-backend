import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkGroup } from './work_group.entity';

@Entity()
export class UserWorkGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => WorkGroup)
  workGroup: WorkGroup;

  @Column({ type: 'char', length: 6 })
  color: string;
}
