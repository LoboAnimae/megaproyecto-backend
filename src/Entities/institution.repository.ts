import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Institution } from "./institution.entity";


@Injectable()

export class InstitutionRepository extends Repository<Institution> {
    constructor(private dataSource: DataSource) {
        super(Institution, dataSource.createEntityManager());
    }

    findById(id: number): Promise<Institution | null> {
        return this.dataSource.getRepository(Institution).findOne({ where: { id } });
    }
    findByName(name: string): Promise<Institution | null> {
        return this.dataSource.getRepository(Institution).findOne({ where: { name } });
    }
    getAll(): Promise<Institution[] | null> {
        return this.dataSource.getRepository(Institution).find();
    }
}