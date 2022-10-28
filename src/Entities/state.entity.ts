import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./country.entity";
import { County } from "./county.entity";
import { IdAndName } from "./singular";


@Entity()
export class State extends IdAndName() {
    @ManyToOne(type => Country, country => country.states)
    country: Country;

    @OneToMany(type => County, county => county.state)
    counties: County[];
}