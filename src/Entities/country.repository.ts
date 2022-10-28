import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Country } from "./country.entity";

@Injectable()
export class CountryRepository extends Repository<Country> {
    constructor(private dataSource: DataSource) {
        super(Country, dataSource.createEntityManager());
    }

    cleanup() {
        this.dataSource.getRepository(Country).delete({});
    }

}