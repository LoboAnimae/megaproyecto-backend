import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.entity";


@Entity()
export class WorkGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(_type => Institution)
  institutionId: Institution;
}