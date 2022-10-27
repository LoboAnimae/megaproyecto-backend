import { Injectable } from "@nestjs/common";
import { DataSource, FindOneOptions, Repository } from "typeorm";
import { Institution } from "./institution.entity";

@Injectable()
export class InstitutionRepository extends Repository<Institution> {
    constructor(private dataSource: DataSource) {
        super(Institution, dataSource.createEntityManager());
    }

    #findOne(searchObject: FindOneOptions<Institution>) {
        return this.dataSource.getRepository(Institution).findOne(searchObject);
    }

    findByName(name: string, options?: FindOneOptions<Institution>): Promise<Institution | null> {
        return this.#findOne({ where: { name }, ...options });
    }

    findById(id: number, options?: FindOneOptions<Institution>): Promise<Institution | null> {
        return this.#findOne({ where: { id }, ...options });
    }
}