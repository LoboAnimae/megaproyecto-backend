import { WorkGroup } from './work_group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne((type) => WorkGroup)
  workGroup: WorkGroup;

  @Column({ type: 'longtext', nullable: false })
  questions: string;

  @Column({ type: 'json', nullable: false })
  answers: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  correctAnswer: number;
}
