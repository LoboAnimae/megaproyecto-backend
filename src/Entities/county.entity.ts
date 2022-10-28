import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Institution } from "./institution.entity";
import { IdAndName } from "./singular";
import { State } from "./state.entity";

@Entity()
export class County extends IdAndName() {
    @ManyToOne(type => State, state => state.counties)
    state: State;

    @OneToMany(type => Institution, Institution => Institution.county)
    institutionsInCounty: Institution[];
}