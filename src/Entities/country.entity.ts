import { Entity, OneToMany } from "typeorm";
import { IdAndName as IdAndName } from "./singular";
import { State } from "./state.entity";

@Entity()
export class Country extends IdAndName() {
    @OneToMany(type => State, state => state.country)
    states: State[];
}