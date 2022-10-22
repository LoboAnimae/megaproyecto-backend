import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.entity";
import { User } from "./user.entity";
import { Document } from "./document.entity";
import { UserWorkGroup } from "./user_work_group";


@Entity()
export class WorkGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(_type => Institution)
  institutionId: Institution;

  @ManyToOne(_type => User)
  document: Document;
}