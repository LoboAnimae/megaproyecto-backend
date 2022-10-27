import {
  Column,
  ColumnType,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';

export function IdAnName(options?: {
  primaryColumnType?: PrimaryGeneratedColumnType;
}) {
  @Entity()
  class IdAndName {
    @PrimaryGeneratedColumn({
      type: options?.primaryColumnType ?? 'integer',
      unsigned: true,
    })
    id: number;

    @Column({ type: 'varchar', length: 191, nullable: false })
    name: string;
  }

  return IdAndName;
}
