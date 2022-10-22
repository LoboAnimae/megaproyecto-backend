import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PortalRole } from "./portal_role.entity";

@Injectable()
export class PortalRoleRepository extends Repository<PortalRole> {
    constructor(private dataSource: DataSource) {
        super(PortalRole, dataSource.createEntityManager());
    }


    findById(id: number): Promise<PortalRole | null> {
        return this.dataSource.getRepository(PortalRole).findOne({ where: { id } });
    }
    findByName(name: string): Promise<PortalRole | null> {
        return this.dataSource.getRepository(PortalRole).findOne({ where: { name } });

    }
    getAll(): Promise<PortalRole[] | null> {
        return this.dataSource.getRepository(PortalRole).find();
    }
}