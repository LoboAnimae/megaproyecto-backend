import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { County } from "./county.entity";
import { Country } from "./country.entity";

@Entity()
// @Unique('unique_name_country', ['name', 'countryId'])
export class State {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  name: string;

  @ManyToOne(type => Country)
  country: Country;

  @OneToMany(type => County, county => county.state)
  counties: County[];
}