import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { County } from "./county.entity";
import { InstitutionType } from "./institution_type.entity";
import { User } from "./user.entity";


@Entity()
export class Institution {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @ManyToOne(_type => InstitutionType)
  institutionType: InstitutionType;

  @ManyToOne(_type => County)
  county: County;

  @OneToMany(_type => User, User => User.institution)
  users: User[];
};