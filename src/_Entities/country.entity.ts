import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./state.entity";

@Entity()
export class Country {
  @PrimaryGeneratedColumn({type: 'smallint', unsigned: true})
  id: number;

  @Column({type: 'varchar', length: 191, nullable: false})
  name: string;
  
  @OneToMany(_type => State, state => state.id)
  states: State[];
}