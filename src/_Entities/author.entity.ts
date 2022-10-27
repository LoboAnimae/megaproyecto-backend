import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 191, nullable: false })
  lastName: string;
}
