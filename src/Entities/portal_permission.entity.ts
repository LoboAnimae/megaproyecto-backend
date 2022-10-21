import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PortalRole } from "./portal_role.entity";
import { User } from "./user.entity";

@Entity()
export class PortalPermission {
    @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 191, nullable: false, unique: true })
    name: string;

    @ManyToMany(_type => PortalRole)
    portalRole: PortalRole[];

    @ManyToMany(type => User)
    users: User[];
}