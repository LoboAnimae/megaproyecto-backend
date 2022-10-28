import {
  Column,
  ColumnType,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';

export function IdAndName(options?: {
  primaryColumnType?: PrimaryGeneratedColumnType;
}) {
  @Entity()
  class IdAndName {
    @PrimaryGeneratedColumn({
      type: options?.primaryColumnType ?? 'integer',
      unsigned: true,
    })
    id: number;

    @Column({ type: 'varchar', length: 512, nullable: false })
    name: string;
  }

  return IdAndName;
}
