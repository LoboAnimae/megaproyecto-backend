import { Entity, ManyToOne, OneToMany } from "typeorm";
import { County } from "./county.entity";
import { IdAndName } from "./singular";
import { User } from "./user.entity";

@Entity()
export class Institution extends IdAndName({ primaryColumnType: 'bigint' }) {
    @OneToMany(() => User, user => user.institution)
    users: User[];

    @ManyToOne(type => County, County => County.institutionsInCounty) 
    county: County;
}